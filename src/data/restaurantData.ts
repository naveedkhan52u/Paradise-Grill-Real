export interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'buffet' | 'bbq' | 'karahi' | 'trout' | 'rice' | 'dessert';
  price: number;
  unit: string;
  description: string;
  image: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'error';
  tag?: string;
  tags?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Karakoram Fire';
  featured?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  source: string;
  timeAgo: string;
}

export const RESTAURANT_INFO = {
  name: "Paradise Grill",
  fullName: "Paradise Hotel & Restaurant",
  city: "Gilgit",
  region: "Gilgit-Baltistan",
  est: "1946",
  address: "River View Rd, Sonikot, Gilgit, 23345",
  rating: 3.8,
  reviewCount: "1,001+",
  phone: "0346 8482943",
  phoneRaw: "03468482943",
  whatsApp: "923468482943",
  email: "info@paradisehotelgilgit.com",
  socialLinks: {
    facebook: "https://www.facebook.com/paradisegrillgilgit",
    tiktok: "https://www.tiktok.com/@paradisegrillgilgit",
    instagram: "https://www.instagram.com/paradisegrillgilgit"
  },
  hoursToday: "12:00 PM – 11:30 PM",
  bbqIgniteTime: "6:30 PM",
  kitchenCloseTime: "11:00 PM",
  googleMapsUrl: "https://maps.google.com/?q=River+View+Rd,+Sonikot,+Gilgit",
  cashNotice: "Cash Only Accepted on Premises. ATMs 300m west at Sonikot Chowk.",
  images: {
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDefSYASr-8HIvJ1zYR7HbF4ldmt5ILYiod9f3o5mxwgwkmlpczxy0s0GYn_bkSqn9kKCRteGi205Od97fuugq4fUUKX5FKAePajTaGs7Zliwe81EyGlIfb6chvOUF8E_z9DcGwjAVLCTurfXCZ2sQhOHvfr9gPTXj-6iec_mej1Madq_2iXJNN-86kPAiYXWUVLP0ft56K1mY7VJa5RZ-RwKyitKgS-9z_3XnoayNfO1AO1KVJsmPKMw",
    heroRiverside: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmj25snqoRS2aY4PrnC4Y1cbJ5tFqbcAekpuMe4PGFd4G15ncirDbC3QUdmdjioasi34QkVOwt2X6CWYXNkiaPbAkj_2JwNfqmRF6VW5CavHLtHtbNXY6BAB8S1t22n7wfipPmL2b3yvkIAKN0v7XmtKYSaQv73VbCIzrtOQN_WYMDTA9sU66cxQdGHS_Egm2nak2214TpDxXumgvmQj6pMHB3KBx5ITKVbTd_IZ2V3CGEIaQ4V0mGbA",
    menuBanner: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_6bJaLiQyyZX0Lbrx7xPSQnVaFtWNSii1wQiK5XRfFXqqWk3ZhKVC91rOCatm8r-Wg8BC91tPppWsesvkFFZtMDWT8Q6PHlWc1wo3xUHE__ebpll_SvTzskbdGjzZhbLnqfvGXhjYBfSe-TK9jqKilipQcM-ImKrr08Vq8sw8YABcKzAVN7_y0ExZkXLVo1IDddAEj33eAzrc_RtE7LoOm-x0YkofaT7aWiHs-xurS548x30LXuAPzw",
    orderDineBanner: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCSonm9goQaM-YANfEuMyoAiz-P91ID4oywsG0k1xjPwgJZiLrCn8h-guPH52VMrCC0H6vD2zZnHt_Bpkgdkm2AtaZrSRcfRhFkXzOtc2Lsmo495QUVXR4Ve0sjwakDtIfeM2oNy9TczuDzNJgjJ3e2YqWyEPO6QkWtg5-ja-C2PZd62LsKXvr9kpNYm5yHugCFfKPqWcEcogF8r7Bgf0cdrKaOJfNkAEBCGg6DZtRxxBB7EyCTsn4cg",
    locationAmbience: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKfVbzUb0Jyw0I9sRob7038H_XLXS4O1UY0exJYcxPup7kKlbEVMEOmLIJ-YsbKPQ20Gwt6w7gN8Wbl3op0Sq5i81oedtDQrwwfjxG8cX122pmTiSXCuw3gu1A3ZpWBP0myvuQA1DqPyEQl8OfL_gp-QDGHFIfS_N3SxYne-kpSmilW0RQIieneU2Avlgsog7v9OAteK81oOsrUy2k3nqtHlGPTZfPBWhbn3O7kWy1MK3BAH9ilEWfbw",
    mapSnapshot1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZm_VEepaPzvLm0wGJi_tzEDYUoeTAYW0yU_J20YXfOMhwsys0PLqElFk-3r4RRQLncHeoeMKzm2GZ1c4TO2PVMjUQRetDWjTcLTg3ANzhiX61s9d3XARlB1qRwX125Clfm9Y1lUoZxxvIqxvJs63F8JtQxpk4L12Iszu79mBM9Q20Rxbl8ELR0Z_diMuuTonCQ5RkT0y4M80v50RCxowFbU8-aKDVFlwesOrZXQ0jHjwUTDWX9NIHtg",
    mapSnapshot2: "https://lh3.googleusercontent.com/aida-public/AB6AXuACYz0kfHn_eEjFtiYas0WxtfLzx_AuaDW_QASSl4t7gTL2lkwJG8FYht2bjdYTuCAHvExZBkBw-lQH4xftkDbhkuNOn1Ci-DfkL0laaB0mfdcx4uEQnFHw8UWvGwZJKcsIbLsP0vX117P4EBWd1Wt_HjF13Wt9OFbUMMAr3WR10IZS9MutICz0FyMDHddK7tuRKlrQ7cBeoVEY9pYbnumO96HZsjWINwq5WWDqbr4lKTYYOaCgED2CVw",
    galleryBBQ: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDRsjeN68ceFQvlrJNAd8YUwVBv6svBmRs_VvplRXlRRwxb3OGO-Uj2JsY1W1t2xlwmet2ef7AEBob6hWA6tEsB0u82R_P4LjREeZ5gnCQNH-Nml85mHYKdExwL1Ou8I3ijRuKTteLagu9C1plTq9pazIppMDj1D-NGrIjZdV5cWWVqKLFW3pZ-kcEtN_9tpz3opONZuEfEBYz9fb3ecbOAN_O7wZu0v1lRzIpljwzC9X9VQmu9j9pGg",
    galleryDeck: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKp9y7KEZ2cOnuozNYOSZXigXjf7l_hIYBJxPiBVdrsGWcW8RxseTbx2-_baX-EbVFk6YZ6wMhsvz4796S7Y8XNY0pbAIvvVZXQVFft7EI72sPfRZOQSu52FLaC-mkUkdiVuLi0UYDdsOz9EzFMYL-aWC0JgHs-e-sK8cQTP8owJ41BsmuhjK0LGoFkkhsV44_iqfM_qJnfSptfeOD1leNjZIgV1QA-vyDVh2Qx2KwSo9cFgF7vp6pcw",
    charcoalPlatter: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwot79hVa6uxavXoItggG2vjYSzYHjM7HUJdnAdgVGfUR2SCMvPXhyUcykSY-vtunp5sZ3KSMH3cGgPM0eRzsL5QXusD5eZJxi9jIzp-SE7nO7dkmVMgLhycIG10wqpjDBwqhKcjX0kqv8HvBcdfkBASbLh5v9xvLZNGo4OFl20CaOlu1B_JPg4516IgAl29HKvzMMjxqkyZ1yIymf-aXxHMPAbycnKczxDvCswRXGn7pCoDqqxAsfTw",
    roghniNaan: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4aF9yX52JycacRWZEWhcKB84z6JkhX-5pWqkY5NgH2mXKR26kpc9Co5g2f7RzOc3lwpbDfjyxyBjtDfGDFrMwmAJLiGSnImrQO97Ml_-Fzu-4bP2T8CLH1txJlVdBfuO7Xhfqls2qnGI8-I9WtOO18guZEygdVpp4CP_YRvgPH7Hm2HA3MPL_FNq9l1bQAsx8iyKOnmQ62Z7MoOx7aS9B8dLJxtTXolQ9n3VH6QEHY-aK0fl28IyvfA"
  }
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "buffet-1",
    title: "All-You-Can-Eat Live BBQ Buffet",
    subtitle: "Chef Recommendation · Sunset Banquet",
    category: "buffet",
    price: 2200,
    unit: "per person",
    description: "Full terrace access with limitless charcoal-grilled meats, Balti curries, fresh tandoori rogheni naans, fresh salads, and authentic hot kheer dessert.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvn5alM0R-RBd4pxx1r5jKC39UFd25qP7cU-m3Kx2-F5mDT-AGpuaGLgGKQ-6w-mIHjbkUH4lyeDvbQxrMWOQRYX85JY5u0P9evbtzlLptCxojX5pvjtmHIB6Vf1IeL-teWv9HuYk9-vFQ6ye2imMDQk6kyUC-AuYlHOMQBPZTLOVbbZYfch52Um-OZKil9oo_Murzv94c2_gYO5FG5jc4Tbv83vDA_afyVHg_bMRom2sHHopRS_gH7g",
    badge: "Daily 7 PM - 11 PM",
    badgeType: "secondary",
    tag: "Halal Certified",
    tags: ["buffet", "all-you-can-eat", "evening", "family", "bbq"],
    featured: true
  },
  {
    id: "karahi-mutton-gb",
    title: "Gilgit Baltistan Mutton Karahi",
    subtitle: "Highland Butter · Mountain Spices · Black Pepper",
    category: "karahi",
    price: 2450,
    unit: "/ 1 kg",
    description: "Slow-simmered tender highland mutton cooked in organic butter, black pepper, and whole mountain spices in an authentic iron handi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAEBvJ6sf8F4wX-xaFeDLH4QjcpakhEhL3u3RNmNzee-TQiVU4gYlTWzehkaLx1_Vlk2APbTqs_z_bM2wJOpb9gwZlStnfVnaTBYTrLcXoEAQzaf-kiq0j5rUaCy8wrdIAf1tTlhlO359kWSn3dvzz4WhnElzbjczbAO7mr2teDnJtd1lycXP4Ey5Akro06GwVu2tQRLhaSZ5aDLo8BBQ1XC4aAGAuLJ8lRqkfOJu_LYBMe6CvsnrS-g",
    badge: "Heritage Recipe",
    badgeType: "primary",
    tag: "Slow Simmered",
    tags: ["mutton", "karahi", "gilgit", "balti", "butter"],
    featured: true
  },
  {
    id: "karahi-shinwari-lamb",
    title: "Special Shinwari Lamb Karahi",
    subtitle: "Himalayan Salt · Tomatoes · Black Pepper",
    category: "karahi",
    price: 2400,
    unit: "/ 1 kg",
    description: "Prepared in pure lamb fat with juicy heirloom mountain tomatoes and crushed black peppercorns. Served piping hot in authentic iron handi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpmUy9wXS67DXY92u4LWMlebz3TQvIcoNynvWVPL8Pvsde2IOqD8X_IeW4hm0Zn_vzxZz9HzK2HhPMnrjUN24hbrMD4YMBCsbXPBYVMLevatprL-Y63gkCnGN90h86MqvaDUc0VEDIfJD5jyvtEbTqhZYIM1Ej91cNI0dRrKpTBFfICT2wnsdSGshqmedtSVrF2B2tfZ54qsCniFYx7qyickkXlOMltQhSCIKN-FjumwICzFIvYBlwww",
    badge: "House Special",
    badgeType: "tertiary",
    tag: "Fresh Cut",
    tags: ["shinwari", "lamb", "karahi", "handi"],
    featured: true
  },
  {
    id: "trout-gilgit",
    title: "Gilgit River Chargrilled Trout",
    subtitle: "Apricot Wood Smoked · Local Herbs",
    category: "trout",
    price: 1850,
    unit: "whole fish",
    description: "Freshly pulled from glacial streams, dry-rubbed in indigenous spices and roasted over fragrant apricot wood. Includes mint dip & pickled onions.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzDo39O-GT2cZX5zgHkN84law-3pn-oFnAgV1Le4iH5wMXuZMcsmzmFd0OPPQL_lsKWGMIgKv9QGT3QNuJhDzA9ZMloez--i_t__dNioDh4kPCyB1UKm1UKEVQ4PEYKliRVzcv-PQCkUMoerTSBgyX_-yH_wPSxp9CaSmi6yPeh9_1AFE54hiWToriPWwkU1309h3Rv4vJmzd5n23LIFhZqBv15Ap02wGuvEGMEY8ZeA6KNlFVKlWyOQ",
    badge: "River Catch",
    badgeType: "secondary",
    tag: "Wild Caught Daily",
    tags: ["trout", "fish", "river", "seafood", "grilled"],
    featured: true
  },
  {
    id: "trout-sajji-combo",
    title: "Smoked River Trout & Balti Sajji",
    subtitle: "Fruitwood Smoked · Hunza Spice Mix",
    category: "trout",
    price: 2800,
    unit: "/ Serving",
    description: "Fresh river catch gently smoked over fruitwood, served with Hunza spice mix, grilled whole poultry sajji, and aromatic saffron rice.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcP8V1V4jMNTt-mX8-r1AgKMpVBp1eWQT-7ccklmSa3cQiwDahkWQV4ha1CkBZmJ_xRQXq0i2zRTe5YLTRxxXQ0JLaK_jPDeoU1rsjta0wUdFpULW76pg4HmmvkeSaMapUQxlPaA9NVJyrt1TaP9h_k5g4iMPIB8TJKjeth97G17X9JywbyrKxqvI82j32vOVKQWJkIwRHJFKr5weneRx3PzyBWP3Utir4iNwrPUzJqHwXEW1PMn7ElA",
    badge: "Terrace Favorite",
    badgeType: "primary",
    tag: "Signature Platter",
    tags: ["trout", "sajji", "combo", "balti"],
    featured: true
  },
  {
    id: "sajji-pulao",
    title: "Karakoram Sajji with Kabuli Pulao",
    subtitle: "Golden Raisins · Almonds · Crusted Skin",
    category: "bbq",
    price: 1950,
    unit: "serves 2-3",
    description: "Slow-cooked whole bird seasoned with sea-salt crust, paired alongside fragrant long-grain basmati pulao braised with sweet mountain carrots.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSH5f-xmNQ5AUlym00n0NsCOjEeCLXRbFX_aKI5q-ZZqPm4uuFw1QJIAuimdO3PHcx1PSHZgIkhLOpPrirZOyMUaEijcfv_CO82NAtXL2ZYJIzcG7C6DGhvq4hFw4GEOB37Rzl_wKKj5jD9NpIdn0yD8_Q6a9gMl3tdPe6fdwn5hw4eERnUntcj6MY7kkbnbLPVC86oPzwEHCvNL-4bKwwNeeuNapuRz3Gnrdm7qGy2z03r1WSbAuYgA",
    badge: "House Special",
    badgeType: "tertiary",
    tag: "Generous Platter",
    tags: ["sajji", "pulao", "kabuli", "chicken", "rice"],
    featured: true
  },
  {
    id: "platter-chapli-seekh",
    title: "Chargrilled Chapli & Seekh Platter",
    subtitle: "Hand-pounded Beef · Pomegranate Seeds · Cumin",
    category: "bbq",
    price: 1600,
    unit: "/ Platter",
    description: "Coarse hand-pounded beef infused with pomegranate seeds, mountain cumin, and grilled over red-hot hickory coals. Served with mint raita.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-misqWqlkEy0St0gNcycGb2AC2QbTUV73CmVUff3Of87LP72El9N_xi5ER6s8kPKgSaSyjCfF-XIN2aWQODRW2dfGVPzwABGoZUX3ZMhEOrDWnXJdts32FaTOPJpNKRERf-3ywFyr_-LssbX0Zh1ODHKBGIEXX1Gp5jCBoUMe2fbPP9SVbkifEITtfPhQn0pIuKHbCoIe4rvGsT0VkQpHHaCE9X36l-XmKm6wxV2pMjFU8VoHwQbktQ",
    badge: "Charcoal Fired",
    badgeType: "primary",
    tag: "Spiced Beef",
    tags: ["chapli", "seekh", "kebab", "bbq", "platter"],
    featured: true
  },
  {
    id: "seekh-kebab-platter",
    title: "Smoked Seekh Kebab Platter",
    subtitle: "Crushed Coriander · Cumin · Garlic Embers",
    category: "bbq",
    price: 1150,
    unit: "6 pieces",
    description: "Minced beef blended with crushed coriander seeds, mountain cumin, and garlic embers, skewered over blazing coals.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDRsjeN68ceFQvlrJNAd8YUwVBv6svBmRs_VvplRXlRRwxb3OGO-Uj2JsY1W1t2xlwmet2ef7AEBob6hWA6tEsB0u82R_P4LjREeZ5gnCQNH-Nml85mHYKdExwL1Ou8I3ijRuKTteLagu9C1plTq9pazIppMDj1D-NGrIjZdV5cWWVqKLFW3pZ-kcEtN_9tpz3opONZuEfEBYz9fb3ecbOAN_O7wZu0v1lRzIpljwzC9X9VQmu9j9pGg",
    badge: "Spicy",
    badgeType: "error",
    tag: "6 Skewered Pieces",
    tags: ["seekh", "kebab", "spicy", "beef"]
  },
  {
    id: "chicken-malai-boti",
    title: "Chicken Malai Boti",
    subtitle: "Clotted Cream · Green Cardamom · White Pepper",
    category: "bbq",
    price: 980,
    unit: "8 cubes",
    description: "Tender boneless chicken marinated overnight in fresh organic clotted cream, green cardamom, and white pepper.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwot79hVa6uxavXoItggG2vjYSzYHjM7HUJdnAdgVGfUR2SCMvPXhyUcykSY-vtunp5sZ3KSMH3cGgPM0eRzsL5QXusD5eZJxi9jIzp-SE7nO7dkmVMgLhycIG10wqpjDBwqhKcjX0kqv8HvBcdfkBASbLh5v9xvLZNGo4OFl20CaOlu1B_JPg4516IgAl29HKvzMMjxqkyZ1yIymf-aXxHMPAbycnKczxDvCswRXGn7pCoDqqxAsfTw",
    badge: "Mild & Creamy",
    badgeType: "secondary",
    tag: "8 Tender Cubes",
    tags: ["malai", "boti", "chicken", "mild", "bbq"]
  },
  {
    id: "roghni-naan-item",
    title: "Clay Oven Roghni Naan",
    subtitle: "Fresh Sesame · Butter Glaze",
    category: "rice",
    price: 120,
    unit: "/ piece",
    description: "Steaming hot traditional sesame-crusted leavened flatbread freshly pulled from the clay pit tandoor, brushed with melted alpine butter.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4aF9yX52JycacRWZEWhcKB84z6JkhX-5pWqkY5NgH2mXKR26kpc9Co5g2f7RzOc3lwpbDfjyxyBjtDfGDFrMwmAJLiGSnImrQO97Ml_-Fzu-4bP2T8CLH1txJlVdBfuO7Xhfqls2qnGI8-I9WtOO18guZEygdVpp4CP_YRvgPH7Hm2HA3MPL_FNq9l1bQAsx8iyKOnmQ62Z7MoOx7aS9B8dLJxtTXolQ9n3VH6QEHY-aK0fl28IyvfA",
    badge: "Mud Tandoor",
    badgeType: "primary",
    tag: "Piping Hot",
    tags: ["naan", "roghni", "bread", "tandoor"]
  },
  {
    id: "karakoram-chai-naan",
    title: "Karakoram Chai & Roghani Naan",
    subtitle: "Saffron & Cardamom Herbal Infusion",
    category: "dessert",
    price: 350,
    unit: "/ Pair",
    description: "Piping hot sesame flatbread straight from the mud tandoor paired with aromatic regional mountain herbal infusion.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9nqAgAKzGsMT05Hvm09Oil__06FLBGL3ZmyM77DETznAhVpLhHl_tyv1tU9R2zSt4uDsJToUkOt1NjuM5CNrI3NhjrLf9WyyROU7Qtv8HGH_rzDSmaaqONGc_U1AKe259DlFkdlGQqOLI8ijcJS4OD1z3CV3wTuV5xyeBlPapc-wINu6luh5yhncDEdgC_qnFKk2okS5edB68FQveyJ4Xz0sUF5A8dnOG3MuPHo4h7qSf3wxR91YVPA",
    badge: "Mountain Classic",
    badgeType: "secondary",
    tag: "Afternoon & Late Night",
    tags: ["chai", "tea", "naan", "herbal"]
  },
  {
    id: "walnut-cake-chai",
    title: "Hunza Walnut Cake & Kashmiri Chai",
    subtitle: "Organic Wild Honey · Himalayan Pink Tea",
    category: "dessert",
    price: 450,
    unit: "pairing set",
    description: "Rich caramelised walnut cake baked with organic wild mountain honey, paired with a soothing, pistachio-topped cup of pink salted tea.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiqdXbh2FvvxgGK1vGRjDEhsQ3ZAX0CP8REuYVLV_-4KcXgucnxSO-TjsxaCByvS1Hvl5MqlIcbk6yF-mK-PbZAArS4m0msCuDr2EIC4MwkQFNdaDBhcUJMDCc131r0sGbzIZ_UI5FMEH0xBrKGaVPDfYO9B8t0TCn9SIXBvB-CSP82pzFeKu0ImQY5unKLfVre_SXHuc5rcTIJ6Ld3jkO1kW_UozgCjDMv2GpyASZwEOpqaZAZrlNww",
    badge: "Valley Heritage",
    badgeType: "tertiary",
    tag: "Authentic Hunza",
    tags: ["walnut", "cake", "kashmiri", "noon chai", "dessert"]
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Tariq Mahmood",
    role: "Local Guide · 142 reviews",
    quote: "Unbeatable river views with Karakoram sunset backdrop! The seekh kababs and chicken karahi are super tender. Bring cash and arrive before sunset to get a front-row balcony seat.",
    rating: 5,
    source: "Google Review",
    timeAgo: "2 weeks ago"
  },
  {
    id: "rev-2",
    author: "Tariq M.",
    role: "Traveler from Lahore",
    quote: "Sitting on the river wooden terrace with fresh mutton karahi while the Karakoram peaks turn gold at sunset is an experience you will remember for life.",
    rating: 5,
    source: "Google Review",
    timeAgo: "1 month ago"
  },
  {
    id: "rev-3",
    author: "Alina S.",
    role: "Mountain Trekker",
    quote: "Best BBQ aroma along the Gilgit river. The chapli kebabs and piping hot roghani naan are unbelievable after a long day exploring Hunza valley.",
    rating: 5,
    source: "Google Review",
    timeAgo: "3 weeks ago"
  }
];

export const LANDMARKS = [
  {
    name: "Gilgit Domestic Airport (GIL)",
    desc: "8 mins drive via Airport Rd & River View",
    distance: "2.8 km",
    icon: "flight"
  },
  {
    name: "Sonikot Suspension Bridge",
    desc: "Panoramic footbridge & pedestrian crossing",
    distance: "350 m",
    icon: "water"
  },
  {
    name: "N15 Karakoram Junction / N-35",
    desc: "Easy paved access toward Hunza & Skardu",
    distance: "5 mins",
    icon: "storefront"
  }
];

export const WEEKLY_HOURS = [
  { day: "Monday", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Tuesday", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Wednesday", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Thursday", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Friday (Jummah & Feast)", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Saturday", hours: "12:00 PM – 11:30 PM", current: false },
  { day: "Sunday", hours: "12:00 PM – 11:30 PM", current: true }
];

export const DELIVERY_ZONES = [
  { id: "sonikot", name: "Sonikot & Basin", time: "Est. 25-35 mins", fee: 150 },
  { id: "jutial", name: "Jutial & Konodas", time: "Est. 30-40 mins", fee: 200 },
  { id: "airport", name: "Airport Road & Kashrote", time: "Est. 20-30 mins", fee: 150 },
  { id: "danyore", name: "Danyore Bridge Sector", time: "Est. 40-50 mins", fee: 250 }
];
