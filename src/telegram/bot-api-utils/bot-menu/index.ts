/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Bot, Context, session, SessionFlavor, InlineKeyboard } from 'grammy';
import { Menu, MenuFlavor } from '@grammyjs/menu';
import * as dotenv from 'dotenv';
import { citiesENum } from 'src/holland2stay/cities.enum';

dotenv.config();

// bot util functions
const setCityInSession = (session, city) => (session.selectedCity = city);

type MyContext = Context & SessionFlavor<SessionData> & MenuFlavor;
interface SessionData {
  selectedCity: string;
}

const createSessionForBot = (bot: Bot) => {
  const defaultSessionData = {
    selectedCity: null,
  };
  bot.use(
    session({
      initial(): SessionData {
        return { ...defaultSessionData };
      },
    }),
  );

  // Wait for click events with specific callback data.
  bot.callbackQuery('click-reminder', async (ctx) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('telegramId', String(ctx.chat.id));
    // @ts-ignore
    urlencoded.append('houseId', ctx.session.selectedCity);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(`${process.env.BASE_API_URL}/notification/new`, requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        console.log('result', result);
        await ctx.answerCallbackQuery({
          text: `Loading...`,
        });
        await ctx.reply(
          'You have created a reminder for this residence! We Will check Holland2Stay every day and will notify you about availablity of this place! EveryDay!',
        );
      })
      .catch((error) => console.log('error', error));
  });
};

const citiesKeyArray = Object.keys(citiesENum) as (keyof typeof citiesENum)[];

const initBotMenus = async (bot: Bot) => {
  const startMessageText = `Hi, This bot will help you to find the *available* Houses at Holland2Stay. You can also set a notifier to let you know when a house in a city became available `;

  createSessionForBot(bot);

  // create menus
  const { selectServiceMenu, selectCityMenu } =
    await createIndAppointmentMenus();

  //   make desk menu children of service menu (so navigation and back button works properly)
  selectServiceMenu.register(selectCityMenu);

  //   initialze menu in the bot
  bot.use(selectServiceMenu);

  // start command handler
  const startHandler = async (ctx: Context) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('telegramId', String(ctx.chat.id));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(`${process.env.BASE_API_URL}/user/add`, requestOptions)
      .then((response) => response.text())
      .then(async (res) => {
        await ctx.reply(startMessageText, {
          reply_markup: selectServiceMenu,
          parse_mode: 'Markdown',
        });
      })
      .catch(() => {
        ctx.reply('Error, please /start again');
      });
  };

  initBotStartCommand(bot, startHandler);

  bot.catch(console.error.bind(console));
};

const initBotStartCommand = (bot, cb) => {
  bot.command('start', (ctx) => cb(ctx));
};

const createIndAppointmentMenus = async () => {
  const serviceMenuName = 'select-service-menu';
  const selectCityMenuName = 'select-city-menu';

  const selectServiceMenu = new Menu<MyContext & SessionFlavor<any>>(
    serviceMenuName,
  );
  const selectCityMenu = new Menu<MyContext & SessionFlavor<any>>(
    selectCityMenuName,
  );

  const createServiceMenu = () => {
    // render menu
    selectServiceMenu
      .submenu(
        {
          text: 'See all Residences',
          payload: 'see-all-residences',
        },
        //  after select any item we will show the desk menu (result)
        selectCityMenuName,
        (ctx) => {
          // edit select service text and convert for desk menu `Please select an IND desk`
          ctx.editMessageText('Please select a City:');
        },
      )
      .row();
  };

  const creteCitiesMenu = () => {
    for (const city of citiesKeyArray) {
      selectCityMenu
        .text(city, async (ctx: MyContext) => {
          setCityInSession(ctx.session, citiesENum[city]);

          await ctx.reply(
            'We are checking H2S website... please wait a moment please...',
          );
          const responseObj = await fetch(
            `${process.env.BASE_API_URL}/holland2stay/${citiesENum[city]}`,
          );
          const resJson = await responseObj.json();

          let text = '';

          if (resJson.noHomeAvailable) {
            text = `At the moment there are no available residences at ${city}`;
          }
          text = `<b>${resJson.totalHomeAvailable}</b> residence is available at ${city}`;

          const responseToUser = new InlineKeyboard()
            .text('Create a reminder', 'click-reminder')
            .row();

          await ctx.reply(text, {
            reply_markup: responseToUser,
            parse_mode: 'HTML',
          });
        })
        .row();
    }
    //   add back button to desk menu
    selectCityMenu.back('back');
  };

  createServiceMenu();
  creteCitiesMenu();

  return {
    selectCityMenu,
    selectServiceMenu,
  };
};

export { initBotMenus };
