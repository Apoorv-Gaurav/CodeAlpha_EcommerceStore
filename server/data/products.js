const snacksImg = 'https://images.unsplash.com/photo-1599598425947-33004bb15037?auto=format&fit=crop&q=80&w=400';
const drinksImg = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400';
const dairyImg = 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400';

const generateProducts = () => {
  const data = [
    // Snacks
    { c: 'Snacks', s: 'Chips', n: "Lay's Classic Salted", w: '52g', p: 20, img: 'https://cms.lays.com/sites/lays.com/files//styles/product_thumbnail/public/2025-12/Lays_XL_Classic_Laydown.png' },
    { c: 'Snacks', s: 'Chips', n: "Kurkure Masala Munch", w: '90g', p: 20, img: 'https://m.media-amazon.com/images/I/71sOPzrW0mL._SX679_.jpg' },
    { c: 'Snacks', s: 'Namkeen', n: "Haldiram's Aloo Bhujia", w: '200g', p: 55, img: 'https://www.haldirams.com/media/catalog/product/cache/0bd3307f358483a8e808873bbd4177c3/a/l/aloo_bhujiya.jpg' },
    { c: 'Snacks', s: 'Namkeen', n: "Bikaji Bhujia", w: '200g', p: 50, img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQXuLmWNV3fH8cqPYl7ZYf0UjX5YAvvvf01e8_Ahi_9-gaepSa2mfNKoxAt4M8bw1X_VCkpRUHB1ROAlDTPCl-WUJoSqYGe' },
    { c: 'Snacks', s: 'Biscuits', n: "Parle-G", w: '300g', p: 35, img: 'https://www.parleproducts.com/Uploads/prdsmallimage/100prodsmall_parle-g.png' },
    { c: 'Snacks', s: 'Biscuits', n: "Britannia Good Day Cashew", w: '200g', p: 40, img: 'https://www.bbassets.com/media/uploads/p/l/263526_23-britannia-good-day-cashew-cookies.jpg' },
    { c: 'Snacks', s: 'Cookies', n: "Sunfeast Dark Fantasy", w: '75g', p: 35, img: 'https://www.bbassets.com/media/uploads/p/l/286082_22-sunfeast-dark-fantasy-choco-fills-biscuits-cookies.jpg' },
    { c: 'Snacks', s: 'Cookies', n: "Unibic Choco Chip", w: '150g', p: 50, img: 'https://www.unibicfoods.com/wp-content/uploads/2022/12/New-Project-4.jpg' },
    { c: 'Snacks', s: 'Chocolates', n: "Cadbury Dairy Milk", w: '45g', p: 25, img: 'https://tastehub.mdlzapps.cloud/img-svc/7e4cef6b-6c07-4f2f-9a06-952cf5f7e337.webp' },
    { c: 'Snacks', s: 'Chocolates', n: "KitKat", w: '37g', p: 20, img: 'https://png.pngtree.com/png-clipart/20231107/original/pngtree-kitkat-chocolate-bar-up-picture-image_13238462.png' },
    { c: 'Snacks', s: 'Candy', n: "Pulse Kachcha Aam", w: '100g', p: 50, img: 'https://cdn.shopify.com/s/files/1/0645/8772/6905/files/ConsumerPouchKARs50FOP_600x.png?v=1743773374' },
    { c: 'Snacks', s: 'Candy', n: "Alpenliebe", w: '100g', p: 45, img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-403,ar-1000-1000,pr-true,f-auto,q-40,dpr-2/cms/product_variant/9e642182-4e67-4999-a3d6-3f288df63e4a/Alpenliebe-Lollipop-Orange-Strawberry-Caramel-Flavour-Family-Pack.jpeg' },
    { c: 'Snacks', s: 'Instant Noodles', n: "Maggi 2-Minute Noodles", w: '70g', p: 15, img: 'https://www.maggi.in/sites/default/files/styles/product_image_desktop_617_900/public/maggi-2minutes-noodles-617x900.png?itok=q_WGWMw-' },
    { c: 'Snacks', s: 'Instant Noodles', n: "Yippee Noodles", w: '70g', p: 15, img: 'https://s7ap1.scene7.com/is/image/itcportalprod/346x265-04?fmt=webp-alpha' },
    { c: 'Snacks', s: 'Popcorn', n: "ACT II Butter Popcorn", w: '90g', p: 30, img: 'https://www.bbassets.com/media/uploads/p/l/304510_3-act-ii-instant-popcorn-golden-sizzle-hot-fresh-delicious.jpg' },
    { c: 'Snacks', s: 'Popcorn', n: "ACT II Salted Popcorn", w: '30g', p: 15, img: 'https://www.bbassets.com/media/uploads/p/l/189220_8-act-ii-instant-popcorn-classic-salted-hot-fresh-delicious.jpg' },
    { c: 'Snacks', s: 'Crackers', n: "Monaco Biscuits", w: '200g', p: 40, img: 'https://www.bbassets.com/media/uploads/p/m/100114531_6-parle-monaco.jpg?tr=w-154,q-80' },
    { c: 'Snacks', s: 'Crackers', n: "KrackJack", w: '200g', p: 40, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/f081fcc4-f03a-46a0-b3ff-99a5dbaba029.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Peanuts', n: "Roasted Salted Peanuts", w: '200g', p: 45, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/355563a7-3a0c-477e-8e41-1f0df08ecbba.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Peanuts', n: "Masala Peanuts", w: '200g', p: 50, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/6478b029-5900-4449-ba0d-497a0dc217e2.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Dry Fruits', n: "Raisins", w: '100g', p: 55, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/67eca203-ffa6-4c95-b41f-7456ed4d232e.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Dry Fruits', n: "Cashews", w: '100g', p: 110, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/d48bb9d0-b7fd-4510-a05a-187c04fa0f70.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Energy Bars', n: "RiteBite Max Protein Bar", w: '50g', p: 50, img: 'https://www.bbassets.com/media/uploads/p/l/100190843_7-ritebite-max-protein-protein-choco-classic-bar.jpg' },
    { c: 'Snacks', s: 'Energy Bars', n: "Yoga Bar", w: '38g', p: 35, img: 'https://www.bbassets.com/media/uploads/p/l/30012172_11-yoga-bar-multigrain-energy-bar-cashew-orange-zest.jpg' },
    { c: 'Snacks', s: 'Samosa/Puffs', n: "Veg Puff", w: '1 Piece', p: 25, img: 'https://www.bbassets.com/media/uploads/p/l/40343018_1-qmin-vegetable-puff.jpg' },
    { c: 'Snacks', s: 'Samosa/Puffs', n: "Samosa", w: '1 Piece', p: 20, img: 'https://i.pinimg.com/736x/fc/4a/ca/fc4aca26c1188380bdaaba964c77f6be.jpg' },
    { c: 'Snacks', s: 'Trail Mix', n: "Healthy Trail Mix", w: '100g', p: 140, img: 'https://www.nutsforwellness.com/cdn/shop/files/Nuts_For_Wellness_Premium_Healthy_Trail_mix_100g_white_1800x1800.jpg?v=1773932951' },
    { c: 'Snacks', s: 'Trail Mix', n: "Nut Mix", w: '100g', p: 300, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/d9d422e7-e6a9-46da-8d99-f29a41e9025c.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Makhana', n: "Roasted Makhana", w: '60g', p: 45, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/rc-upload-1770262823137-218.png?bg_token=color.background.quaternary' },
    { c: 'Snacks', s: 'Makhana', n: "Peri Peri Makhana", w: '60g', p: 50, img: 'https://cdn.grofers.com/da/cms-assets/cms/product/rc-upload-1770262823137-207.png?bg_token=color.background.quaternary' },

    // Drinks
    { c: 'Drinks', s: 'Soft Drinks', n: "Coca-Cola", w: '750ml', p: 40, img: 'https://www.coca-cola.com/content/dam/onexp/in/en/home-page-test-img/brands/coca-cola/Coke_234x700.png/width1960.png' },
    { c: 'Drinks', s: 'Soft Drinks', n: "Pepsi", w: '750ml', p: 40, img: 'https://www.bbassets.com/media/uploads/p/l/251047_25-pepsi-soft-drink.jpg' },
    { c: 'Drinks', s: 'Fruit Juice', n: "Real Mixed Fruit", w: '1L', p: 120, img: 'https://www.bbassets.com/media/uploads/p/l/229912_11-real-fruit-power-juice-mango.jpg' },
    { c: 'Drinks', s: 'Fruit Juice', n: "Tropicana Orange", w: '1L', p: 125, img: 'https://www.bbassets.com/media/uploads/p/l/229792_20-tropicana-fruit-juice-delight-orange.jpg' },
    { c: 'Drinks', s: 'Energy Drinks', n: "Red Bull", w: '250ml', p: 125, img: 'https://www.bbassets.com/media/uploads/p/l/100012278_14-red-bull-energy-drink.jpg' },
    { c: 'Drinks', s: 'Energy Drinks', n: "Sting", w: '250ml', p: 20, img: 'https://www.bbassets.com/media/uploads/p/l/40363575_1-sting-energy-drink.jpg' },
    { c: 'Drinks', s: 'Packaged Water', n: "Bisleri", w: '1L', p: 20, img: 'https://www.bisleri.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwb2d6bbd4/images/homepage/bisleri-500ml-bottle.jpeg' },
    { c: 'Drinks', s: 'Packaged Water', n: "Kinley", w: '1L', p: 20, img: 'https://www.bbassets.com/media/uploads/p/l/412419_1-kinley-mineral-water.jpg' },
    { c: 'Drinks', s: 'Sports Drinks', n: "Gatorade Blue Bolt", w: '500ml', p: 50, img: 'https://www.bbassets.com/media/uploads/p/m/40314318_2-gatorade-sports-drink-blue-bolt-flavour.jpg?tr=w-154,q-80' },
    { c: 'Drinks', s: 'Sports Drinks', n: "Enerzal", w: '500ml', p: 45, img: 'https://enerzal.com/images/products/1684819422-1_crop.webp' },
    { c: 'Drinks', s: 'Iced Tea', n: "Lipton Ice Tea Peach", w: '350ml', p: 40, img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=900/da/cms-assets/cms/product/36db4a6d-25f1-432d-bc16-4e22f4b717f8.png?bg_token=color.background.quaternary' },
    { c: 'Drinks', s: 'Iced Tea', n: "Nestea Lemon", w: '350ml', p: 40, img: 'https://www.nestleprofessional.in/sites/default/files/2023-09/NESTEA%20Iced%20Tea%20Lemon%201Kg%20IN%20FOP%20400x380px%20copy.webp' },
    { c: 'Drinks', s: 'Coffee', n: "Nescafe Cold Coffee", w: '180ml', p: 40, img: 'https://www.nescafe.com/in/sites/default/files/styles/pdp_banner_image/public/2024-09/New%20Chilled%20Latte%20Can%203D_0.png.webp?itok=xihEVpIF' },
    { c: 'Drinks', s: 'Coffee', n: "Starbucks Frappuccino", w: '250ml', p: 175, img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-470,ar-1200-1200,pr-true,f-auto,q-40,dpr-2/cms/product_variant/21bb0df0-d2bc-4047-afe9-f2ecfbc51fba/Starbucks-Frappuccino-Mocha-Cold-Coffee.jpg' },
    { c: 'Drinks', s: 'Milkshakes', n: "Amul Kool Kesar", w: '180ml', p: 25, img: 'https://www.starquik.com/cdn/shop/files/SQ103032_FOP_044c95e8-8713-4532-967f-5587638cdbd7.jpg?v=1776845929&width=713' },
    { c: 'Drinks', s: 'Milkshakes', n: "Hershey's Milkshake", w: '180ml', p: 40, img: 'https://www.hersheyland.in/content/dam/Hersheyland_India/en_in/products/milkshakes/milkshake-chooclate-180ml-FOP.png' },
    { c: 'Drinks', s: 'Coconut Water', n: "Raw Pressery Coconut Water", w: '200ml', p: 50, img: 'https://www.rawpressery.com/cdn/shop/files/coconutwater_fc0ac9f1-5f97-48c5-9fdb-579fd16aca64.jpg?v=1685691892&width=1100' },
    { c: 'Drinks', s: 'Coconut Water', n: "Paper Boat Coconut Water", w: '200ml', p: 45, img: 'https://www.bbassets.com/media/uploads/p/l/40114332_10-paper-boat-coconut-water.jpg' },
    { c: 'Drinks', s: 'Flavoured Soda', n: "Sprite", w: '750ml', p: 40, img: 'https://www.bbassets.com/media/uploads/p/m/251006_13-sprite-soft-drink-lime-flavoured.jpg?tr=w-154,q-80' },
    { c: 'Drinks', s: 'Flavoured Soda', n: "Fanta Orange", w: '750ml', p: 40, img: 'https://www.bbassets.com/media/uploads/p/l/251019_8-fanta-soft-drink-orange-flavoured.jpg' },

    // Dairy
    { c: 'Dairy', s: 'Milk', n: "Amul Taaza", w: '500ml', p: 29, img: 'https://www.bbassets.com/media/uploads/p/l/40090894_7-amul-taaza.jpg' },
    { c: 'Dairy', s: 'Milk', n: "Mother Dairy Toned Milk", w: '500ml', p: 28, img: 'https://www.bbassets.com/media/uploads/p/l/40147029_5-mother-dairy-toned-milk.jpg' },
    { c: 'Dairy', s: 'Ice Cream', n: "Amul Vanilla Tub", w: '750ml', p: 180, img: 'https://www.bbassets.com/media/uploads/p/l/40323660_2-amul-gold-vanilla-royale-ice-cream.jpg' },
    { c: 'Dairy', s: 'Ice Cream', n: "Kwality Walls Cornetto", w: '120ml', p: 50, img: 'https://www.bbassets.com/media/uploads/p/l/40124699_8-kwality-walls-frozen-dessert-cornetto-disc-oreo.jpg' },
    { c: 'Dairy', s: 'Curd', n: "Amul Masti Dahi", w: '400g', p: 40, img: 'https://www.bbassets.com/media/uploads/p/l/40179763_7-amul-masti-dahi.jpg' },
    { c: 'Dairy', s: 'Curd', n: "Mother Dairy Curd", w: '400g', p: 50, img: 'https://www.bbassets.com/media/uploads/p/l/40004532_9-mother-dairy-dahi-made-from-toned-milk.jpg' },
    { c: 'Dairy', s: 'Butter', n: "Amul Butter", w: '100g', p: 60, img: 'https://www.bbassets.com/media/uploads/p/l/104860-2_2-amul-butter-pasteurised.jpg' },
    { c: 'Dairy', s: 'Butter', n: "Mother Dairy Butter", w: '100g', p: 58, img: 'https://www.bbassets.com/media/uploads/p/l/30007663_4-mother-dairy-butter.jpg' },
    { c: 'Dairy', s: 'Cheese', n: "Amul Cheese Slices", w: '200g', p: 145, img: 'https://www.bbassets.com/media/uploads/p/l/104808-2_5-amul-cheese-slices.jpg' },
    { c: 'Dairy', s: 'Cheese', n: "Britannia Cheese Cubes", w: '200g', p: 140, img: 'https://www.bbassets.com/media/uploads/p/l/127362_18-britannia-cheese-cubes.jpg' },
    { c: 'Dairy', s: 'Paneer', n: "Amul Paneer", w: '200g', p: 95, img: 'https://www.bbassets.com/media/uploads/p/l/279588-2_4-amul-malai-paneer.jpg' },
    { c: 'Dairy', s: 'Paneer', n: "Mother Dairy Paneer", w: '200g', p: 90, img: 'https://www.bbassets.com/media/uploads/p/l/296470_8-mother-dairy-paneer-fresh.jpg' },
    { c: 'Dairy', s: 'Lassi', n: "Amul Lassi", w: '200ml', p: 20, img: 'https://shop.amul.com/s/62fa94df8c13af2e242eba16/67a5b05cf72c1f010d5e90c4/02-fop_amul-mango-lassi-tetrapack-1l-1024x1024.png' },
    { c: 'Dairy', s: 'Lassi', n: "Verka Sweet Lassi", w: '200ml', p: 25, img: 'https://verka.coop/wp-content/uploads/2020/03/Sweet-Lassi-400-ml-3D-2048x1905.jpg' },
    { c: 'Dairy', s: 'Flavoured Milk', n: "Amul Kool Badam", w: '180ml', p: 25, img: 'https://www.bbassets.com/media/uploads/p/l/40175693_4-amul-kool-badam.jpg' },
    { c: 'Dairy', s: 'Flavoured Milk', n: "Cavin's Badam Milk", w: '180ml', p: 30, img: 'https://www.bbassets.com/media/uploads/p/l/900456992_1-cavins-badam-flavoured-milk.jpg' },
    { c: 'Dairy', s: 'Yogurt', n: "Epigamia Greek Yogurt", w: '90g', p: 45, img: 'https://www.bbassets.com/media/uploads/p/m/40046551_3-epigamia-greek-yogurt-honey-banana.jpg?tr=w-154,q-80' },
    { c: 'Dairy', s: 'Yogurt', n: "Nestlé A+ Yogurt", w: '100g', p: 35, img: 'https://www.bbassets.com/media/uploads/p/l/40108870_8-nestle-a-grekyo-greek-yoghurt-blueberry.jpg' },
    { c: 'Dairy', s: 'Cream', n: "Amul Fresh Cream", w: '250ml', p: 70, img: 'https://shop.amul.com/s/62fa94df8c13af2e242eba16/677394dca9fb5601512c0439/02-fop_amul-fresh-cream-250ml-1024x1024.png' },
    { c: 'Dairy', s: 'Cream', n: "Mother Dairy Fresh Cream", w: '250ml', p: 68, img: 'https://www.bbassets.com/media/uploads/p/l/70000733-3_3-mother-dairy-cream-uht.jpg' }
  ];

  const soldOutProducts = ['Enerzal', 'Starbucks Frappuccino', 'Nestlé A+ Yogurt', 'Yoga Bar'];

  return data.map((item, index) => ({
    _id: String(index + 1),
    name: item.n,
    category: item.c,
    subCategory: item.s,
    weight: item.w,
    price: item.p,
    deliveryTime: '8 MINS',
    imageUrl: item.img || `https://placehold.co/400x400/eef2ff/3730a3?text=${encodeURIComponent(item.n)}`,
    inStock: !soldOutProducts.includes(item.n)
  }));
};

module.exports = generateProducts();
