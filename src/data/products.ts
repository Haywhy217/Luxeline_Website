export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  img: string;
  hoverImg: string;
  description: string;
  category: string;
  style: string;
  volume: string;
};

export const categories = [
  { id: 1, name: 'Essentials', image: '/plaintees.jpg' },
  { id: 2, name: 'Trending', image: '/trending pic.jpg'},
  { id: 3, name: 'Accessories', image: '/Gshock.jpg' },
  { id: 4, name: 'Sneakers', image: '/addidas.jpg' },
];

export const products: Product[] = [
  {
    id: 1,
    slug: '705-tees-and-long-sleeves',
    name: '705 Tees and Long Sleeves',
    price: 25,
    img: '/705 tees.jpg',
    hoverImg: '/705 teesh.jpg',
    description: 'Stay cool and stylish with the 705 Tees & Long Sleeve combo. Made from breathable cotton, it’s the perfect fit for a casual day out or layering in colder weather.',
    category: 'Essentials',
    style: 'Casual',
    volume: 'Standard fit',
  },
  {
    id: 2,
    slug: 'adidas-sambas-sneakers',
    name: 'Adidas Sambas Sneakers',
    price: 85,
    img: '/addidas.jpg',
    hoverImg: '/addidashover.jpg',
    description: 'The iconic Adidas Sambas deliver heritage style with a modern twist. The classic three stripes and retro design make them a must-have for any sneakerhead.',
    category: 'Sneakers',
    style: 'Streetwear',
    volume: 'Size 39-44',
  },
  {
    id: 3,
    slug: 'g-shock-watch',
    name: 'G-Shock Watch',
    price: 110,
    img: '/Gshock.jpg',
    hoverImg: '/Gshockhover.jpg',
    description: 'Built tough, the G-Shock Watch is shock-resistant and water-resistant up to 200 meters. A durable, bold accessory for everyday wear.',
    category: 'Accessories',
    style: 'Utility',
    volume: 'Unisex',
  },
  {
    id: 4,
    slug: 'plain-tees',
    name: 'Plain Tees',
    price: 18,
    img: '/plaintees.jpg',
    hoverImg: '/plainteesh.jpg',
    description: 'Elevate your basics with our Plain Tees. Crafted from soft, breathable cotton, these tees are perfect for layering or wearing solo.',
    category: 'Essentials',
    style: 'Minimal',
    volume: 'Classic fit',
  },
];
