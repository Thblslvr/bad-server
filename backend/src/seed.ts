import mongoose from 'mongoose'
import User from './models/user'
import Product from './models/product'

const adminUser = {
  name: 'Admin',
  email: 'admin@mail.ru',
  password: 'password',   // будет захэширован моделью при сохранении
  roles: ['admin'],
  lastOrderDate: null,
  lastOrder: null,
  totalAmount: 0,
  orderCount: 0,
  orders: [],
  tokens: [],
}

const customerUser = {
  name: 'First Customer',
  email: 'user1@mail.ru',
  password: 'password1',
  roles: ['customer'],
  lastOrderDate: null,
  lastOrder: null,
  totalAmount: 0,
  orderCount: 0,
  orders: [],
  tokens: [],
}

const products = [
  {
    title: '+1 час в сутках',
    image: { fileName: '/images/5_Dots.png', originalName: '5_Dots.png' },
    category: 'софт-скил',
    description: 'Если планируете решать задачи в тренажёре, берите два.',
    price: 750,
  },
  {
    title: 'HEX-леденец',
    image: { fileName: '/images/Shell.png', originalName: 'Shell.png' },
    category: 'другое',
    description: 'Лизните этот леденец, чтобы мгновенно запоминать и узнавать любой цветовой код CSS.',
    price: 1450,
  },
  {
    title: 'Мамка-таймер',
    image: { fileName: '/images/Asterisk_2.png', originalName: 'Asterisk_2.png' },
    category: 'софт-скил',
    description: 'Будет стоять над душой и не давать прокрастинировать.',
    price: null,
  },
  {
    title: 'Фреймворк куки судьбы',
    image: { fileName: '/images/Soft_Flower.png', originalName: 'Soft_Flower.png' },
    category: 'дополнительное',
    description: 'Откройте эти куки, чтобы узнать, какой фреймворк вы должны изучить дальше.',
    price: 2500,
  },
  {
    title: 'Кнопка «Замьютить кота»',
    image: { fileName: '/images/mute-cat.png', originalName: 'mute-cat.png' },
    category: 'кнопка',
    description: 'Если орёт кот, нажмите кнопку.',
    price: 2000,
  },
  {
    title: 'БЭМ-пилюлька',
    image: { fileName: '/images/Pill.png', originalName: 'Pill.png' },
    category: 'другое',
    description: 'Чтобы научиться правильно называть модификаторы, без этого не обойтись.',
    price: 1500,
  },
  {
    title: 'Портативный телепорт',
    image: { fileName: '/images/Polygon.png', originalName: 'Polygon.png' },
    category: 'другое',
    description: 'Измените локацию для поиска работы.',
    price: 100000,
  },
  {
    title: 'Микровселенная в кармане',
    image: { fileName: '/images/Butterfly.png', originalName: 'Butterfly.png' },
    category: 'другое',
    description: 'Даст время для изучения React, ООП и бэкенда',
    price: 750,
  },
  {
    title: 'UI/UX-карандаш',
    image: { fileName: '/images/Leaf.png', originalName: 'Leaf.png' },
    category: 'хард-скил',
    description: 'Очень полезный навык для фронтендера. Без шуток.',
    price: 10000,
  },
  {
    title: 'Бэкенд-антистресс',
    image: { fileName: '/images/Mithosis.png', originalName: 'Mithosis.png' },
    category: 'другое',
    description: 'Сжимайте мячик, чтобы снизить стресс от тем по бэкенду.',
    price: 1000,
  },
]

export async function seedDatabase() {
  // Добавляем пользователей, если их ещё нет
  const adminExists = await User.exists({ email: adminUser.email })
  if (!adminExists) {
    await User.create(adminUser)
    // eslint-disable-next-line no-console
    console.log('Admin user created')
  }

  const customerExists = await User.exists({ email: customerUser.email })
  if (!customerExists) {
    await User.create(customerUser)
    // eslint-disable-next-line no-console
    console.log('Customer user created')
  }

  // Добавляем продукты, если коллекция пуста
  const productCount = await Product.countDocuments()
  if (productCount === 0) {
    await Product.insertMany(products)
    // eslint-disable-next-line no-console
    console.log('Products seeded')
  }
}