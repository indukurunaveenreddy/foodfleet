/* ============================================================
   FoodFleet — Dynamic Online Food Ordering & Delivery System
   Application Logic (Vanilla JS with localStorage DB)
   ============================================================ */

// ============================================================
// DATABASE — localStorage-backed simulated database
// ============================================================
const DB = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(`foodfleet_${key}`)); }
    catch { return null; }
  },
  set(key, value) {
    localStorage.setItem(`foodfleet_${key}`, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(`foodfleet_${key}`);
  }
};

// ============================================================
// CURRENCY — Indian Rupees
// ============================================================
const CURRENCY = '₹';
function formatPrice(amount) {
  return `${CURRENCY}${amount.toFixed(2)}`;
}

// ============================================================
// IMAGE MAP — maps category to the food images we have
// ============================================================
const IMAGE_MAP = {
  burger:   'hero-burger.jpg',
  pizza:    'pizza.jpg',
  sushi:    'sushi.jpg',
  pasta:    'pasta.jpg',
  tacos:    'tacos.jpg',
  salad:    'salad.jpg',
  dessert:  'pasta.jpg',
  icecream: 'icecream.jpg',
  drinks:   'drinks.jpg',
  biryani:  'biryani.jpg',
  chinese:  'chinese.jpg',
  sandwich: 'hero-burger.jpg',
};

// ============================================================
// SEED DATA — Restaurants
// ============================================================
const SEED_RESTAURANTS = [
  { id: 'r_dhaba', name: "Indukuru's Family Dhaba", cuisine: 'Special Multi-Cuisine & Dhaba', rating: 5.0, reviews: 2450, deliveryTime: '20-30 min', image: IMAGE_MAP.biryani, tags: ['👑 Special Featured','Family Dhaba','Biryani Special','Andhra Meals'], category: 'dhaba', isSpecial: true },
  { id: 'r1', name: 'Burger Palace', cuisine: 'American', rating: 4.8, reviews: 324, deliveryTime: '25-30 min', image: IMAGE_MAP.burger, tags: ['Burgers','Fast Food','American'], category: 'burger' },
  { id: 'r2', name: 'Pizza Roma', cuisine: 'Italian', rating: 4.7, reviews: 512, deliveryTime: '30-40 min', image: IMAGE_MAP.pizza, tags: ['Pizza','Italian','Pasta'], category: 'pizza' },
  { id: 'r3', name: 'Sakura Sushi', cuisine: 'Japanese', rating: 4.9, reviews: 287, deliveryTime: '35-45 min', image: IMAGE_MAP.sushi, tags: ['Sushi','Japanese','Seafood'], category: 'sushi' },
  { id: 'r4', name: 'Pasta La Vista', cuisine: 'Italian', rating: 4.6, reviews: 198, deliveryTime: '25-35 min', image: IMAGE_MAP.pasta, tags: ['Pasta','Italian','Wine'], category: 'pasta' },
  { id: 'r5', name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.5, reviews: 156, deliveryTime: '20-30 min', image: IMAGE_MAP.tacos, tags: ['Tacos','Mexican','Spicy'], category: 'tacos' },
  { id: 'r6', name: 'Green Bowl', cuisine: 'Healthy', rating: 4.7, reviews: 231, deliveryTime: '20-25 min', image: IMAGE_MAP.salad, tags: ['Salads','Healthy','Organic'], category: 'salad' },
  { id: 'r7', name: 'Hyderabadi Biryani House', cuisine: 'Indian', rating: 4.9, reviews: 678, deliveryTime: '30-40 min', image: IMAGE_MAP.biryani, tags: ['Biryani','Indian','Mughlai'], category: 'biryani' },
  { id: 'r8', name: 'Dragon Wok', cuisine: 'Chinese', rating: 4.6, reviews: 345, deliveryTime: '25-35 min', image: IMAGE_MAP.chinese, tags: ['Chinese','Noodles','Indo-Chinese'], category: 'chinese' },
  { id: 'r9', name: 'Creamery Delight', cuisine: 'Desserts', rating: 4.8, reviews: 412, deliveryTime: '15-25 min', image: IMAGE_MAP.icecream, tags: ['Ice Cream','Desserts','Shakes'], category: 'icecream' },
  { id: 'r10', name: 'Refreshment Hub', cuisine: 'Beverages', rating: 4.4, reviews: 189, deliveryTime: '15-20 min', image: IMAGE_MAP.drinks, tags: ['Soft Drinks','Juices','Beverages'], category: 'drinks' },
];

// ============================================================
// SEED DATA — 250 Menu Items (prices in ₹)
// ============================================================
const SEED_MENU = [
  // ──────────── BURGERS (15 items) ────────────
  { id: 'm1',  name: 'Classic Smash Burger', description: 'Double smashed patties, American cheese, pickles, special sauce', price: 199, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm2',  name: 'Bacon BBQ Burger', description: 'Crispy bacon, cheddar, caramelized onions, smoky BBQ glaze', price: 249, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm3',  name: 'Mushroom Swiss Burger', description: 'Sautéed mushrooms, Swiss cheese, garlic aioli on brioche', price: 229, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm4',  name: 'Spicy Jalapeño Burger', description: 'Pepper jack cheese, jalapeños, chipotle mayo, crispy onions', price: 219, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm5',  name: 'Veggie Delight Burger', description: 'Grilled vegetable patty, avocado, lettuce, tomato, herb mayo', price: 179, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm6',  name: 'Paneer Tikka Burger', description: 'Spiced paneer patty, mint chutney, onion rings, tandoori mayo', price: 189, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm7',  name: 'Double Decker Burger', description: 'Three buns, double patty, double cheese, signature sauce', price: 299, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm8',  name: 'Crispy Chicken Burger', description: 'Crispy fried chicken fillet, coleslaw, pickles, honey mustard', price: 209, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm9',  name: 'Aloo Tikki Burger', description: 'Spiced potato patty, tamarind sauce, onion, green chutney', price: 129, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm10', name: 'BBQ Chicken Burger', description: 'Grilled chicken, bacon, BBQ sauce, cheddar, lettuce', price: 239, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm11', name: 'Truffle Burger', description: 'Truffle aioli, gruyère cheese, caramelized shallots, arugula', price: 349, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm12', name: 'Mexican Bean Burger', description: 'Black bean patty, guacamole, salsa, pepper jack cheese', price: 199, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm13', name: 'Fish Fillet Burger', description: 'Crispy battered fish, tartar sauce, lettuce, lemon', price: 229, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm14', name: 'Lamb Kofta Burger', description: 'Spiced lamb patty, tzatziki, cucumber, pickled onions', price: 279, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm15', name: 'Kids Mini Burger', description: 'Small chicken patty, cheese, ketchup with fries', price: 129, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },

  // ──────────── PIZZA (15 items) ────────────
  { id: 'm16', name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil, olive oil', price: 249, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm17', name: 'Pepperoni Supreme', description: 'Double pepperoni, mozzarella blend, crushed red pepper', price: 349, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm18', name: 'Truffle Mushroom Pizza', description: 'Wild mushrooms, truffle oil, fontina cheese, arugula', price: 399, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm19', name: 'BBQ Chicken Pizza', description: 'Grilled chicken, BBQ sauce, red onions, cilantro, smoked gouda', price: 369, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm20', name: 'Paneer Tikka Pizza', description: 'Tandoori paneer, capsicum, onion, green chutney drizzle', price: 329, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm21', name: 'Veggie Supreme Pizza', description: 'Bell peppers, olives, mushrooms, onions, jalapeños, corn', price: 299, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm22', name: 'Four Cheese Pizza', description: 'Mozzarella, cheddar, parmesan, blue cheese blend', price: 379, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm23', name: 'Hawaiian Pizza', description: 'Ham, pineapple, mozzarella, marinara sauce', price: 329, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm24', name: 'Farmhouse Pizza', description: 'Mushroom, capsicum, onion, tomato with herbs', price: 279, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm25', name: 'Meat Lovers Pizza', description: 'Pepperoni, sausage, bacon, ham, ground beef', price: 449, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm26', name: 'Garlic Bread Pizza', description: 'Cheesy garlic bread with herbs and butter', price: 149, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm27', name: 'Peri Peri Chicken Pizza', description: 'Spicy peri peri chicken, onion, capsicum, mozzarella', price: 359, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm28', name: 'Calzone', description: 'Folded pizza with ricotta, mozzarella, spinach, mushrooms', price: 299, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm29', name: 'Tandoori Chicken Pizza', description: 'Tandoori chicken chunks, onion, capsicum, mozzarella', price: 369, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },
  { id: 'm30', name: 'Cheese Burst Pizza', description: 'Extra cheese stuffed crust, loaded mozzarella, herbs', price: 389, category: 'pizza', restaurant: 'Pizza Roma', image: IMAGE_MAP.pizza },

  // ──────────── SUSHI (12 items) ────────────
  { id: 'm31', name: 'Salmon Nigiri Set', description: 'Eight pieces of premium Atlantic salmon on seasoned rice', price: 499, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm32', name: 'Dragon Roll', description: 'Shrimp tempura, avocado, eel sauce, sesame seeds', price: 449, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm33', name: 'Sashimi Platter', description: 'Chef\'s selection of tuna, salmon, yellowtail — 12 pieces', price: 699, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm34', name: 'California Roll', description: 'Crab meat, avocado, cucumber, tobiko, 8 pieces', price: 349, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm35', name: 'Tempura Roll', description: 'Crispy shrimp tempura, spicy mayo, avocado, crunch', price: 399, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm36', name: 'Tuna Tartare', description: 'Fresh tuna, sesame oil, scallions, wonton crisps', price: 549, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm37', name: 'Rainbow Roll', description: 'Assorted fish over California roll, wasabi, ginger', price: 529, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm38', name: 'Edamame', description: 'Steamed soybean pods with sea salt', price: 149, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm39', name: 'Miso Soup', description: 'Traditional Japanese miso with tofu, seaweed, scallions', price: 129, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm40', name: 'Spicy Tuna Roll', description: 'Fresh tuna, sriracha mayo, cucumber, tempura flakes', price: 429, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm41', name: 'Veggie Sushi Platter', description: 'Avocado, cucumber, sweet potato, asparagus rolls', price: 329, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },
  { id: 'm42', name: 'Gyoza (6 pcs)', description: 'Pan-fried Japanese dumplings with dipping sauce', price: 199, category: 'sushi', restaurant: 'Sakura Sushi', image: IMAGE_MAP.sushi },

  // ──────────── PASTA (15 items) ────────────
  { id: 'm43', name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce, fresh fettuccine, cracked black pepper', price: 299, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm44', name: 'Lobster Ravioli', description: 'Handmade ravioli stuffed with lobster in saffron cream', price: 549, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm45', name: 'Pesto Penne', description: 'Fresh basil pesto, sun-dried tomatoes, pine nuts, parmesan', price: 279, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm46', name: 'Spaghetti Bolognese', description: 'Slow-cooked meat ragù, parmesan, fresh basil', price: 319, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm47', name: 'Carbonara', description: 'Pancetta, egg, pecorino romano, black pepper, spaghetti', price: 329, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm48', name: 'Arrabbiata Penne', description: 'Spicy tomato sauce, garlic, red chili, fresh basil', price: 249, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm49', name: 'Mac & Cheese', description: 'Creamy three-cheese sauce, elbow pasta, breadcrumb topping', price: 229, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm50', name: 'Mushroom Risotto', description: 'Arborio rice, wild mushrooms, truffle oil, parmesan', price: 349, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm51', name: 'Aglio Olio', description: 'Garlic, olive oil, chili flakes, parsley, spaghetti', price: 239, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm52', name: 'Lasagna', description: 'Layered pasta sheets, meat sauce, béchamel, mozzarella', price: 379, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm53', name: 'Spinach Ricotta Ravioli', description: 'Fresh ravioli, sage butter, walnuts, parmesan shavings', price: 329, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm54', name: 'Penne Rosa', description: 'Creamy tomato sauce, sun-dried tomatoes, basil, parmesan', price: 269, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm55', name: 'Chicken Alfredo Pasta', description: 'Grilled chicken strips in creamy alfredo with fettuccine', price: 339, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm56', name: 'Vodka Penne', description: 'Tomato vodka cream sauce, basil, parmesan, penne', price: 299, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },
  { id: 'm57', name: 'Garlic Bread Sticks', description: 'Crispy breadsticks with garlic butter and herbs', price: 129, category: 'pasta', restaurant: 'Pasta La Vista', image: IMAGE_MAP.pasta },

  // ──────────── TACOS (12 items) ────────────
  { id: 'm58', name: 'Chicken Street Tacos', description: 'Grilled chicken, pico de gallo, avocado crema, cilantro', price: 199, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm59', name: 'Carnitas Tacos', description: 'Slow-braised pork, pickled onion, salsa verde, queso fresco', price: 229, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm60', name: 'Fish Tacos', description: 'Baja-style beer-battered fish, chipotle slaw, lime', price: 249, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm61', name: 'Paneer Tacos', description: 'Spiced paneer, mango salsa, jalapeño, sour cream', price: 189, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm62', name: 'Veggie Bean Tacos', description: 'Black beans, corn, avocado, pickled jalapeño, cotija', price: 169, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm63', name: 'Shrimp Tacos', description: 'Grilled garlic shrimp, cabbage slaw, chipotle aioli', price: 279, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm64', name: 'Burrito Bowl', description: 'Rice, beans, chicken, corn, salsa, cheese, sour cream', price: 249, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm65', name: 'Quesadilla', description: 'Flour tortilla, cheese, chicken, peppers, sour cream', price: 199, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm66', name: 'Nachos Supreme', description: 'Tortilla chips, cheese sauce, jalapeños, beans, guacamole', price: 219, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm67', name: 'Chicken Burrito', description: 'Large flour tortilla, grilled chicken, rice, beans, salsa', price: 259, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm68', name: 'Churros (6 pcs)', description: 'Cinnamon sugar churros with chocolate dipping sauce', price: 149, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },
  { id: 'm69', name: 'Mexican Rice Bowl', description: 'Cilantro lime rice, grilled veggies, salsa, cheese, beans', price: 189, category: 'tacos', restaurant: 'Taco Fiesta', image: IMAGE_MAP.tacos },

  // ──────────── SALADS (12 items) ────────────
  { id: 'm70', name: 'Mediterranean Bowl', description: 'Grilled chicken, feta, olives, cherry tomatoes, mixed greens', price: 249, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm71', name: 'Caesar Salad', description: 'Romaine, parmesan crisps, house-made dressing, croutons', price: 199, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm72', name: 'Quinoa Power Bowl', description: 'Quinoa, avocado, roasted chickpeas, tahini dressing, kale', price: 279, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm73', name: 'Greek Salad', description: 'Cucumber, tomato, feta, olives, red onion, oregano dressing', price: 219, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm74', name: 'Asian Sesame Salad', description: 'Mixed greens, edamame, mandarin, crispy noodles, sesame ginger dressing', price: 239, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm75', name: 'Cobb Salad', description: 'Chicken, bacon, eggs, avocado, blue cheese, ranch', price: 269, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm76', name: 'Grilled Paneer Salad', description: 'Tandoori paneer, rocket, cherry tomatoes, mint dressing', price: 229, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm77', name: 'Fruit & Nut Salad', description: 'Seasonal fruits, mixed nuts, honey yogurt dressing', price: 199, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm78', name: 'Roasted Beet Salad', description: 'Roasted beets, goat cheese, walnuts, balsamic glaze', price: 249, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm79', name: 'Thai Peanut Bowl', description: 'Shredded cabbage, carrots, edamame, peanut sauce, cilantro', price: 229, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm80', name: 'Avocado Toast Bowl', description: 'Smashed avocado, cherry tomatoes, poached egg, microgreens', price: 259, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },
  { id: 'm81', name: 'Detox Green Smoothie Bowl', description: 'Spinach, banana, spirulina, granola, chia seeds, berries', price: 219, category: 'salad', restaurant: 'Green Bowl', image: IMAGE_MAP.salad },

  // ──────────── BIRYANI & INDIAN (18 items) ────────────
  { id: 'm82',  name: 'Hyderabadi Chicken Biryani', description: 'Aromatic basmati rice, tender chicken, saffron, fried onions, raita', price: 299, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm83',  name: 'Mutton Dum Biryani', description: 'Slow-cooked mutton, fragrant spices, saffron rice, mint', price: 399, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm84',  name: 'Veg Biryani', description: 'Mixed vegetables, paneer, basmati rice, whole spices', price: 219, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm85',  name: 'Egg Biryani', description: 'Boiled eggs in spiced gravy, layered basmati rice, fried onions', price: 229, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm86',  name: 'Prawn Biryani', description: 'Jumbo prawns, coconut, curry leaves, fragrant basmati rice', price: 449, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm87',  name: 'Lucknowi Chicken Biryani', description: 'Awadhi style, rose water, kewra, saffron, tender chicken', price: 329, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm88',  name: 'Paneer Butter Masala', description: 'Creamy tomato-cashew gravy, soft paneer cubes, butter', price: 249, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm89',  name: 'Butter Chicken', description: 'Tandoori chicken in rich tomato-butter gravy, cream, kasuri methi', price: 299, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm90',  name: 'Dal Makhani', description: 'Black lentils slow-cooked overnight, butter, cream, spices', price: 199, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm91',  name: 'Chicken Tikka (8 pcs)', description: 'Chargrilled chicken marinated in yogurt and spices', price: 279, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm92',  name: 'Tandoori Roti (4 pcs)', description: 'Whole wheat bread baked in clay oven, butter', price: 79, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm93',  name: 'Garlic Naan (2 pcs)', description: 'Soft leavened bread with garlic, butter, coriander', price: 99, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm94',  name: 'Chicken 65', description: 'Spicy deep-fried chicken, curry leaves, red chili', price: 249, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm95',  name: 'Palak Paneer', description: 'Fresh spinach puree, paneer cubes, cumin, cream', price: 229, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm96',  name: 'Chole Bhature', description: 'Spiced chickpea curry with deep-fried puffed bread', price: 179, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm97',  name: 'Mutton Rogan Josh', description: 'Kashmiri style slow-cooked mutton in aromatic gravy', price: 379, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm98',  name: 'Fish Curry', description: 'Fresh fish in tangy coconut curry, curry leaves, mustard seeds', price: 329, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },
  { id: 'm99',  name: 'Jeera Rice', description: 'Fragrant basmati rice tempered with cumin seeds and ghee', price: 129, category: 'biryani', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.biryani },

  // ──────────── CHINESE / INDO-CHINESE (15 items) ────────────
  { id: 'm100', name: 'Veg Hakka Noodles', description: 'Stir-fried noodles with vegetables, soy sauce, spring onions', price: 179, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm101', name: 'Chicken Hakka Noodles', description: 'Wok-tossed noodles with chicken, vegetables, soy chili sauce', price: 219, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm102', name: 'Veg Fried Rice', description: 'Stir-fried rice with mixed vegetables, egg, soy sauce', price: 169, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm103', name: 'Chicken Fried Rice', description: 'Wok-fried rice with chicken, egg, vegetables, spring onions', price: 209, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm104', name: 'Manchurian (Veg)', description: 'Deep-fried veg balls in spicy Manchurian sauce', price: 189, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm105', name: 'Chicken Manchurian', description: 'Crispy chicken in tangy Manchurian sauce, spring onions', price: 229, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm106', name: 'Chilli Chicken', description: 'Spicy Indo-Chinese chicken with peppers, onions, soy sauce', price: 249, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm107', name: 'Chilli Paneer', description: 'Crispy paneer cubes tossed in spicy chili-soy sauce', price: 219, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm108', name: 'Spring Rolls (6 pcs)', description: 'Crispy rolls stuffed with vegetables, served with sweet chili sauce', price: 149, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm109', name: 'Sweet & Sour Chicken', description: 'Battered chicken in tangy sweet and sour sauce, pineapple', price: 239, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm110', name: 'Schezwan Noodles', description: 'Spicy Szechuan-style noodles with vegetables, chili oil', price: 199, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm111', name: 'Honey Chilli Potato', description: 'Crispy potato fingers in honey-chili glaze, sesame seeds', price: 179, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm112', name: 'Kung Pao Chicken', description: 'Spicy chicken with peanuts, dried chilies, Sichuan pepper', price: 269, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm113', name: 'Hot & Sour Soup', description: 'Tangy soup with tofu, mushrooms, bamboo shoots, egg', price: 129, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm114', name: 'Dim Sum Basket (8 pcs)', description: 'Steamed dumplings with mixed fillings, soy dip', price: 249, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },

  // ──────────── DESSERTS (12 items) ────────────
  { id: 'm115', name: 'Chocolate Lava Cake', description: 'Warm molten chocolate center, vanilla bean ice cream', price: 199, category: 'dessert', restaurant: 'Pasta La Vista', image: IMAGE_MAP.dessert },
  { id: 'm116', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers, mascarpone cream, cocoa', price: 229, category: 'dessert', restaurant: 'Pizza Roma', image: IMAGE_MAP.dessert },
  { id: 'm117', name: 'Gulab Jamun (4 pcs)', description: 'Soft milk dumplings soaked in cardamom-rose sugar syrup', price: 99, category: 'dessert', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.dessert },
  { id: 'm118', name: 'Ras Malai (3 pcs)', description: 'Soft paneer patties in saffron-cardamom milk, pistachios', price: 129, category: 'dessert', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.dessert },
  { id: 'm119', name: 'Brownie with Ice Cream', description: 'Warm fudge brownie topped with vanilla ice cream, chocolate sauce', price: 179, category: 'dessert', restaurant: 'Creamery Delight', image: IMAGE_MAP.dessert },
  { id: 'm120', name: 'Cheesecake', description: 'New York style baked cheesecake with berry compote', price: 249, category: 'dessert', restaurant: 'Creamery Delight', image: IMAGE_MAP.dessert },
  { id: 'm121', name: 'Panna Cotta', description: 'Italian cream pudding with mango coulis, fresh berries', price: 199, category: 'dessert', restaurant: 'Pasta La Vista', image: IMAGE_MAP.dessert },
  { id: 'm122', name: 'Gajar Ka Halwa', description: 'Traditional carrot halwa with khoya, nuts, cardamom', price: 149, category: 'dessert', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.dessert },
  { id: 'm123', name: 'Jalebi (250g)', description: 'Crispy spiral sweets soaked in saffron sugar syrup', price: 99, category: 'dessert', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.dessert },
  { id: 'm124', name: 'Banana Split', description: 'Banana, three scoops of ice cream, chocolate, nuts, cherry', price: 219, category: 'dessert', restaurant: 'Creamery Delight', image: IMAGE_MAP.dessert },
  { id: 'm125', name: 'Apple Pie', description: 'Warm cinnamon apple filling, flaky crust, whipped cream', price: 189, category: 'dessert', restaurant: 'Pizza Roma', image: IMAGE_MAP.dessert },
  { id: 'm126', name: 'Kulfi Faluda', description: 'Traditional Indian ice cream with vermicelli, rose syrup, nuts', price: 149, category: 'dessert', restaurant: 'Hyderabadi Biryani House', image: IMAGE_MAP.dessert },

  // ──────────── ICE CREAMS (18 items) ────────────
  { id: 'm127', name: 'Belgian Chocolate Ice Cream', description: 'Rich Belgian chocolate, chocolate chips, cocoa swirl', price: 149, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm128', name: 'Classic Vanilla', description: 'Madagascar vanilla bean ice cream, smooth and creamy', price: 99, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm129', name: 'Strawberry Cheesecake Ice Cream', description: 'Strawberry swirl, cheesecake chunks, graham cracker', price: 169, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm130', name: 'Mango Sorbet', description: 'Fresh Alphonso mango sorbet, dairy-free, refreshing', price: 129, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm131', name: 'Butter Scotch Sundae', description: 'Butterscotch ice cream, caramel sauce, crunchy praline, whipped cream', price: 199, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm132', name: 'Cookie Dough Ice Cream', description: 'Vanilla ice cream loaded with chocolate chip cookie dough', price: 179, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm133', name: 'Mint Chocolate Chip', description: 'Cool mint ice cream with dark chocolate chips', price: 149, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm134', name: 'Pista Kulfi', description: 'Traditional Indian pistachio kulfi, dense and creamy', price: 119, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm135', name: 'Kesar Pista Ice Cream', description: 'Saffron-infused ice cream with roasted pistachios', price: 159, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm136', name: 'Chocolate Brownie Sundae', description: 'Chocolate ice cream, warm brownie, hot fudge, whipped cream', price: 249, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm137', name: 'Caramel Crunch', description: 'Salted caramel ice cream with toffee crunch pieces', price: 159, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm138', name: 'Black Current Ice Cream', description: 'Tangy blackcurrant ice cream with berry swirl', price: 139, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm139', name: 'Waffle with Ice Cream', description: 'Crispy Belgian waffle, two scoops, chocolate sauce, nuts', price: 279, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm140', name: 'Oreo Shake', description: 'Thick Oreo milkshake with ice cream, crushed cookies, cream', price: 179, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm141', name: 'Chocolate Shake', description: 'Rich chocolate milkshake with ice cream, cocoa, whipped cream', price: 169, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm142', name: 'Mango Milkshake', description: 'Fresh Alphonso mango blended with ice cream and milk', price: 159, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm143', name: 'Cold Coffee with Ice Cream', description: 'Chilled coffee, vanilla ice cream, chocolate drizzle', price: 169, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
  { id: 'm144', name: 'Dry Fruit Ice Cream Cup', description: 'Premium ice cream loaded with almonds, cashews, raisins', price: 189, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },

  // ──────────── SOFT DRINKS & BEVERAGES (18 items) ────────────
  { id: 'm145', name: 'Coca-Cola (300ml)', description: 'Classic Coca-Cola, chilled and refreshing', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm146', name: 'Coca-Cola (750ml)', description: 'Coca-Cola family size bottle', price: 60, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm147', name: 'Pepsi (300ml)', description: 'Pepsi cola, ice-cold and fizzy', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm148', name: 'Sprite (300ml)', description: 'Lemon-lime soda, clear and crisp', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm149', name: 'Fanta Orange (300ml)', description: 'Orange flavored carbonated drink', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm150', name: 'Thumbs Up (750ml)', description: 'Bold and strong cola flavor, Indian favorite', price: 60, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm151', name: 'Mountain Dew (300ml)', description: 'Citrus-flavored carbonated energy drink', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm152', name: 'Limca (300ml)', description: 'Tangy lemon-lime soda, refreshing Indian classic', price: 40, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm153', name: 'Fresh Lime Soda', description: 'Freshly squeezed lime, soda water, sugar/salt — your choice', price: 69, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm154', name: 'Masala Chaas', description: 'Spiced buttermilk with cumin, coriander, mint', price: 49, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm155', name: 'Mango Lassi', description: 'Thick yogurt smoothie with Alphonso mango, cardamom', price: 99, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm156', name: 'Sweet Lassi', description: 'Traditional Punjabi sweet yogurt drink, rose water', price: 79, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm157', name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice, no added sugar', price: 99, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm158', name: 'Watermelon Juice', description: 'Fresh watermelon juice with mint, chilled', price: 89, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm159', name: 'Masala Chai', description: 'Indian spiced tea with ginger, cardamom, cinnamon', price: 39, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm160', name: 'Filter Coffee', description: 'South Indian style filter coffee, strong and aromatic', price: 49, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm161', name: 'Iced Americano', description: 'Double espresso over ice, crisp and bold', price: 129, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm162', name: 'Virgin Mojito', description: 'Lime, mint, soda, sugar — the classic refresher', price: 119, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },

  // ──────────── INDUKURU'S FAMILY DHABA SPECIALS (25 items) ────────────
  { id: 'm163', name: 'Indukuru Special Thali', description: 'Rice, 3 curries, dal, rasam, curd, pickle, papad, sweet — family recipe', price: 249, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm164', name: 'Indukuru Chicken Biryani', description: 'Secret family spice blend, dum-cooked basmati, salan & raita', price: 299, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm165', name: 'Indukuru Mutton Biryani', description: 'Tender goat meat, slow-cooked with aromatic spices, served with mirchi ka salan', price: 399, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm166', name: 'Indukuru Egg Biryani', description: 'Boiled eggs in spiced biryani rice, family special masala', price: 199, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm167', name: 'Indukuru Veg Biryani', description: 'Mixed vegetables in aromatic rice, homestyle dum preparation', price: 179, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm168', name: 'Indukuru Gongura Chicken', description: 'Tangy sorrel leaves chicken curry, Andhra family recipe', price: 279, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm169', name: 'Indukuru Butter Chicken', description: 'Rich tomato-cream gravy, tender chicken, family secret spices', price: 269, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm170', name: 'Indukuru Paneer Butter Masala', description: 'Creamy paneer in rich butter tomato gravy, family style', price: 229, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm171', name: 'Indukuru Dal Tadka', description: 'Yellow lentils tempered with ghee, cumin, garlic, green chillies', price: 149, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm172', name: 'Indukuru Chicken 65', description: 'Crispy deep-fried spicy chicken, curry leaves, green chillies', price: 219, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm173', name: 'Indukuru Chapati Meals', description: '4 chapati, 2 curries, rice, dal — wholesome family meal', price: 199, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm174', name: 'Indukuru Fish Fry', description: 'Crispy fried fish marinated in Andhra spices, lemon wedge', price: 259, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm175', name: 'Indukuru Prawn Curry', description: 'Spicy prawn curry cooked in coconut and tamarind base', price: 329, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm176', name: 'Indukuru Chicken Noodles', description: 'Indo-Chinese style chicken hakka noodles, family wok recipe', price: 189, category: 'chinese', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.chinese },
  { id: 'm177', name: 'Indukuru Fried Rice', description: 'Egg fried rice with vegetables, soy sauce, family special', price: 169, category: 'chinese', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.chinese },
  { id: 'm178', name: 'Indukuru Chicken Manchurian', description: 'Crispy chicken balls in tangy Manchurian sauce', price: 209, category: 'chinese', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.chinese },
  { id: 'm179', name: 'Indukuru Pesarattu', description: 'Green moong dal dosa with ginger chutney, Andhra breakfast special', price: 99, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm180', name: 'Indukuru Idli Sambar', description: 'Soft steamed idlis (4pcs) with sambar and coconut chutney', price: 79, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm181', name: 'Indukuru Dosa Combo', description: 'Plain dosa + masala dosa with sambar, chutneys', price: 149, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm182', name: 'Indukuru Family Pack Biryani', description: 'Chicken biryani for 4 people with raita, salan, boiled eggs', price: 799, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm183', name: 'Indukuru Gulab Jamun (4pcs)', description: 'Soft fried milk balls soaked in rose-cardamom syrup', price: 99, category: 'dessert', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.dessert },
  { id: 'm184', name: 'Indukuru Double Ka Meetha', description: 'Hyderabadi bread pudding with condensed milk, nuts, saffron', price: 129, category: 'dessert', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.dessert },
  { id: 'm185', name: 'Indukuru Mango Lassi', description: 'Thick creamy mango yogurt drink, family recipe', price: 89, category: 'drinks', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.drinks },
  { id: 'm186', name: 'Indukuru Masala Chai', description: 'Strong ginger-cardamom tea, dhaba style', price: 29, category: 'drinks', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.drinks },
  { id: 'm187', name: 'Indukuru Payasam', description: 'Vermicelli kheer with milk, cashews, raisins, cardamom', price: 109, category: 'dessert', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.dessert },

  // ──────────── SNACKS & STARTERS (15 items) ────────────
  { id: 'm188', name: 'Samosa (2pcs)', description: 'Crispy pastry filled with spiced potato and peas', price: 49, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm189', name: 'Onion Bhaji', description: 'Crispy onion fritters with gram flour, spices', price: 69, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm190', name: 'Paneer Pakora', description: 'Paneer cubes in spiced gram flour batter, deep fried', price: 119, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm191', name: 'Aloo Tikki Chaat', description: 'Potato patties topped with chutneys, yogurt, sev', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm192', name: 'Pani Puri (6pcs)', description: 'Crispy puris filled with spicy tangy water, potato, chickpeas', price: 69, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm193', name: 'Dahi Puri', description: 'Crispy puris with yogurt, chutneys, sev topping', price: 79, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm194', name: 'Veg Spring Rolls', description: 'Crispy rolls stuffed with stir-fried vegetables', price: 109, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm195', name: 'Chicken Lollipop', description: 'Spicy chicken drumettes, fried golden crispy', price: 199, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm196', name: 'Chilli Paneer Dry', description: 'Paneer tossed with capsicum, onion, soy-chilli sauce', price: 179, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm197', name: 'Crispy Corn', description: 'Fried corn kernels tossed in butter garlic seasoning', price: 129, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm198', name: 'Mushroom Pepper Fry', description: 'Button mushrooms stir-fried with black pepper, curry leaves', price: 149, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm199', name: 'Chicken Tikka (6pcs)', description: 'Tandoori marinated chicken chunks, smoky chargrilled', price: 229, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm200', name: 'Malai Tikka', description: 'Creamy cashew-marinated chicken tikka, mild and tender', price: 249, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm201', name: 'Hara Bhara Kebab', description: 'Spinach, peas, potato kebabs, crispy outside, soft inside', price: 139, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm202', name: 'Masala Papad', description: 'Crispy papad topped with onion, tomato, coriander masala', price: 59, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },

  // ──────────── SOUTH INDIAN (12 items) ────────────
  { id: 'm203', name: 'Masala Dosa', description: 'Crispy rice crepe filled with spiced potato masala', price: 99, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm204', name: 'Mysore Masala Dosa', description: 'Dosa with red chutney spread, potato filling, ghee', price: 119, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm205', name: 'Rava Dosa', description: 'Crispy semolina dosa with onion, coriander, cashews', price: 109, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm206', name: 'Onion Uttapam', description: 'Thick rice pancake topped with onion, tomato, green chilli', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm207', name: 'Medu Vada (3pcs)', description: 'Crispy urad dal doughnuts served with sambar, chutney', price: 79, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm208', name: 'Curd Vada (3pcs)', description: 'Soft soaked vadas in thick yogurt with sweet chutney', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm209', name: 'Upma', description: 'Semolina cooked with vegetables, tempered with mustard seeds', price: 69, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm210', name: 'Pongal', description: 'Rice and moong dal cooked with ghee, pepper, cumin', price: 79, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm211', name: 'Appam with Stew', description: 'Lacy rice pancake served with vegetable coconut stew', price: 119, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm212', name: 'Lemon Rice', description: 'Tangy rice with lemon, peanuts, turmeric, mustard tempering', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm213', name: 'Tamarind Rice', description: 'Pulihora — rice with tamarind paste, peanuts, sesame, spices', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm214', name: 'Coconut Rice', description: 'Rice mixed with fresh grated coconut, cashews, curry leaves', price: 89, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },

  // ──────────── TANDOORI & KEBABS (10 items) ────────────
  { id: 'm215', name: 'Tandoori Chicken Full', description: 'Whole chicken marinated in yogurt-spice paste, clay oven roasted', price: 449, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm216', name: 'Tandoori Chicken Half', description: 'Half chicken marinated in yogurt-spice paste, chargrilled', price: 249, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm217', name: 'Seekh Kebab (4pcs)', description: 'Minced lamb kebabs with herbs, onion, grilled on skewers', price: 279, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm218', name: 'Reshmi Kebab', description: 'Silky smooth chicken kebabs with cream and cashew marinade', price: 249, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm219', name: 'Paneer Tikka (6pcs)', description: 'Chargrilled paneer with capsicum, onion, tandoori marinade', price: 199, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm220', name: 'Fish Tikka', description: 'Boneless fish cubes marinated in mustard-yogurt paste, grilled', price: 269, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm221', name: 'Tandoori Prawns', description: 'Jumbo prawns in spiced yogurt marinade, tandoor roasted', price: 349, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm222', name: 'Afghani Chicken', description: 'Cream-cheese marinated chicken, mild and smoky', price: 259, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm223', name: 'Banjara Kebab', description: 'Spicy lamb chunks grilled with green chutney and spices', price: 299, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },
  { id: 'm224', name: 'Veg Seekh Kebab', description: 'Vegetable and paneer kebabs on skewers, chargrilled', price: 179, category: 'biryani', restaurant: "Indukuru's Family Dhaba", image: IMAGE_MAP.biryani },

  // ──────────── WRAPS & ROLLS (10 items) ────────────
  { id: 'm225', name: 'Chicken Shawarma Roll', description: 'Spiced chicken, garlic sauce, pickles, wrapped in rumali roti', price: 149, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm226', name: 'Paneer Kathi Roll', description: 'Spiced paneer wrapped in paratha with onion, chutney', price: 129, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm227', name: 'Egg Roll', description: 'Egg omelette wrapped in paratha with onion, green chutney', price: 99, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm228', name: 'Chicken Tikka Roll', description: 'Tandoori chicken tikka wrapped in roomali roti, mint sauce', price: 169, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm229', name: 'Falafel Wrap', description: 'Crispy falafel, hummus, tahini, pickled vegetables in pita', price: 159, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm230', name: 'Mutton Seekh Roll', description: 'Grilled mutton seekh kebab wrapped with onion, lemon', price: 189, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm231', name: 'Veg Frankie', description: 'Mixed vegetables in spiced roti wrap with chutneys', price: 89, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm232', name: 'Fish Finger Roll', description: 'Crispy fish fingers, tartar sauce, lettuce in tortilla wrap', price: 179, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm233', name: 'Double Chicken Roll', description: 'Double chicken filling, cheese, mayo, onion in paratha', price: 199, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },
  { id: 'm234', name: 'Mushroom Cheese Roll', description: 'Sautéed mushrooms, melted cheese, herbs in tortilla wrap', price: 139, category: 'burger', restaurant: 'Burger Palace', image: IMAGE_MAP.burger },

  // ──────────── MOMOS & DUMPLINGS (8 items) ────────────
  { id: 'm235', name: 'Steamed Veg Momos (8pcs)', description: 'Steamed dumplings with mixed vegetable filling, spicy chutney', price: 99, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm236', name: 'Steamed Chicken Momos (8pcs)', description: 'Juicy chicken-filled steamed momos, fiery red chutney', price: 129, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm237', name: 'Fried Veg Momos (8pcs)', description: 'Crispy fried vegetable momos, golden and crunchy', price: 119, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm238', name: 'Fried Chicken Momos (8pcs)', description: 'Deep fried chicken momos with schezwan dipping sauce', price: 149, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm239', name: 'Tandoori Momos (8pcs)', description: 'Momos grilled in tandoori marinade, smoky and spicy', price: 159, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm240', name: 'Kurkure Momos (8pcs)', description: 'Extra crispy coated momos with cheese filling', price: 149, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm241', name: 'Paneer Momos (8pcs)', description: 'Steamed momos stuffed with spiced paneer, coriander', price: 129, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },
  { id: 'm242', name: 'Gravy Momos (8pcs)', description: 'Steamed momos drenched in spicy red gravy sauce', price: 139, category: 'chinese', restaurant: 'Dragon Wok', image: IMAGE_MAP.chinese },

  // ──────────── MILKSHAKES & SMOOTHIES (8 items) ────────────
  { id: 'm243', name: 'Oreo Milkshake', description: 'Crushed Oreo cookies blended with vanilla ice cream, milk', price: 149, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm244', name: 'Chocolate Milkshake', description: 'Rich chocolate syrup, ice cream, milk — thick and creamy', price: 139, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm245', name: 'Strawberry Milkshake', description: 'Fresh strawberry puree blended with ice cream and milk', price: 139, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm246', name: 'Banana Smoothie', description: 'Ripe banana, honey, oats, milk — protein-packed smoothie', price: 119, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm247', name: 'Mixed Berry Smoothie', description: 'Blueberry, raspberry, strawberry blended with yogurt', price: 159, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm248', name: 'Cold Coffee', description: 'Chilled coffee with milk, sugar, ice cream topping', price: 109, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm249', name: 'Badam Milk', description: 'Almond-flavored milk with saffron, cardamom, pistachios', price: 99, category: 'drinks', restaurant: 'Refreshment Hub', image: IMAGE_MAP.drinks },
  { id: 'm250', name: 'Rose Falooda', description: 'Rose syrup, vermicelli, basil seeds, ice cream, topped with nuts', price: 149, category: 'icecream', restaurant: 'Creamery Delight', image: IMAGE_MAP.icecream },
];

// ============================================================
// SEED ORDERS (prices in ₹)
// ============================================================
const SEED_ORDERS = [
  { id: 'ORD-001', customer: 'Rahul Sharma', email: 'rahul@example.com', items: ['Hyderabadi Chicken Biryani x2', 'Butter Chicken'], total: 897, status: 'preparing', date: '2026-10-07', address: '123 MG Road, Hyderabad', timeline: [
    { step: 'Order Placed', time: '8:00 PM', done: true },
    { step: 'Confirmed by Restaurant', time: '8:02 PM', done: true },
    { step: 'Preparing Your Food', time: '8:05 PM', done: true, active: true },
    { step: 'Out for Delivery', time: '', done: false },
    { step: 'Delivered', time: '', done: false },
  ]},
  { id: 'ORD-002', customer: 'Priya Patel', email: 'priya@example.com', items: ['Margherita Pizza', 'Tiramisu'], total: 478, status: 'delivered', date: '2026-10-06', address: '456 Banjara Hills, Hyderabad', timeline: [
    { step: 'Order Placed', time: '6:30 PM', done: true },
    { step: 'Confirmed by Restaurant', time: '6:32 PM', done: true },
    { step: 'Preparing Your Food', time: '6:35 PM', done: true },
    { step: 'Out for Delivery', time: '7:00 PM', done: true },
    { step: 'Delivered', time: '7:22 PM', done: true },
  ]},
  { id: 'ORD-003', customer: 'Ankit Verma', email: 'ankit@example.com', items: ['Dragon Roll', 'Salmon Nigiri Set', 'Mango Lassi'], total: 1047, status: 'pending', date: '2026-10-07', address: '789 Jubilee Hills, Hyderabad', timeline: [
    { step: 'Order Placed', time: '8:30 PM', done: true },
    { step: 'Confirmed by Restaurant', time: '', done: false, active: true },
    { step: 'Preparing Your Food', time: '', done: false },
    { step: 'Out for Delivery', time: '', done: false },
    { step: 'Delivered', time: '', done: false },
  ]},
];

// ============================================================
// INITIALIZE DATA
// ============================================================
function initializeData() {
  // Always reset to get updated menu & prices
  DB.set('restaurants', SEED_RESTAURANTS);
  DB.set('menu', SEED_MENU);
  if (!DB.get('orders')) DB.set('orders', SEED_ORDERS);
  if (!DB.get('users')) DB.set('users', []);
  if (!DB.get('cart')) DB.set('cart', []);
}

// ============================================================
// NAVIGATION — SPA page routing
// ============================================================
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  if (page === 'restaurants') renderAllRestaurants();
  if (page === 'menu') renderMenuItems();
  if (page === 'admin') renderAdminPanel();
  if (page === 'payment') renderCheckout();
}

document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});
document.getElementById('logo-home').addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('home');
});

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================================
// MOBILE NAV
// ============================================================
function toggleMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================================
// RESTAURANT RENDERING
// ============================================================
function renderRestaurantCard(r) {
  const isSpecial = r.isSpecial || r.name.includes("Indukuru");
  return `
    <div class="restaurant-card ${isSpecial ? 'special-dhaba-card' : ''}" onclick="viewRestaurantMenu('${r.id}')" ${isSpecial ? 'style="border:2px solid #f59e0b;box-shadow:0 6px 24px rgba(245,158,11,0.25);position:relative"' : ''}>
      <div class="restaurant-card-img">
        <img src="${r.image}" alt="${r.name}" loading="lazy" width="400" height="200">
        ${isSpecial 
          ? `<div class="badge" style="background:linear-gradient(135deg, #f59e0b, #ef4444);color:#fff;font-weight:700;box-shadow:0 2px 10px rgba(245,158,11,0.4)">👑 ⭐ 5.0 SPECIAL DHABA</div>` 
          : `<div class="badge">⭐ ${r.rating}</div>`}
        <div class="time-badge">${r.deliveryTime}</div>
      </div>
      <div class="restaurant-card-body">
        <h3 style="${isSpecial ? 'color:#f59e0b;font-weight:700;display:flex;align-items:center;gap:6px' : ''}">${isSpecial ? '👑 ' : ''}${r.name}</h3>
        <div class="restaurant-meta">
          <span class="rating">⭐ ${r.rating} (${r.reviews})</span>
          <span>·</span>
          <span>${r.cuisine}</span>
        </div>
        <div class="restaurant-tags">
          ${r.tags.map(t => `<span ${isSpecial && t.includes('Special') ? 'style="background:rgba(245,158,11,0.2);color:#f59e0b;border:1px solid rgba(245,158,11,0.4)"' : ''}>${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderFeaturedRestaurants() {
  const restaurants = DB.get('restaurants') || [];
  const container = document.getElementById('featured-restaurants');
  const featured = restaurants.slice(0, 3);
  container.innerHTML = featured.map(renderRestaurantCard).join('');
}

function renderAllRestaurants(filter = '') {
  const restaurants = DB.get('restaurants') || [];
  const container = document.getElementById('all-restaurants');
  let filtered = restaurants;
  if (filter) {
    const q = filter.toLowerCase();
    filtered = restaurants.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  }
  container.innerHTML = filtered.length
    ? filtered.map(renderRestaurantCard).join('')
    : '<p style="text-align:center;color:var(--clr-text-muted);grid-column:1/-1;padding:60px 0">No restaurants found matching your search.</p>';
}

function searchRestaurants(query) { renderAllRestaurants(query); }

function viewRestaurantMenu(restaurantId) {
  const restaurants = DB.get('restaurants') || [];
  const r = restaurants.find(x => x.id === restaurantId);
  if (r) {
    navigateTo('menu');
    const cat = (r.id === 'r_dhaba' || r.name.includes("Indukuru")) ? 'dhaba' : r.category;
    filterMenu(cat, null);
    document.querySelectorAll('#menu-categories .category-card').forEach(c => {
      c.classList.toggle('active', c.dataset.category === cat);
    });
  }
}

// ============================================================
// MENU RENDERING
// ============================================================
function renderMenuItems(category = 'all') {
  const menu = DB.get('menu') || [];
  const container = document.getElementById('menu-items-grid');
  let filtered = menu;
  if (category === 'dhaba') {
    filtered = menu.filter(m => (m.restaurant && m.restaurant.includes("Indukuru")) || m.category === 'dhaba');
  } else if (category !== 'all') {
    filtered = menu.filter(m => m.category === category);
  }

  container.innerHTML = filtered.length
    ? filtered.map(item => `
      <div class="menu-item">
        <div class="menu-item-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="100" height="100">
        </div>
        <div class="menu-item-info">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <div class="menu-item-footer">
            <span class="menu-item-price">${formatPrice(item.price)}</span>
            <button class="add-to-cart-btn" onclick="addToCart('${item.id}')" aria-label="Add ${item.name} to cart">+</button>
          </div>
        </div>
      </div>
    `).join('')
    : '<p style="text-align:center;color:var(--clr-text-muted);grid-column:1/-1;padding:60px 0">No items in this category yet.</p>';
}

function filterMenu(category, el) {
  if (el) {
    document.querySelectorAll('#menu-categories .category-card, #page-menu .category-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  }
  renderMenuItems(category);
}

function filterCategory(category, el) {
  document.querySelectorAll('#categories-scroll .category-card').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  navigateTo('menu');
  filterMenu(category, null);
  document.querySelectorAll('#menu-categories .category-card').forEach(c => {
    c.classList.toggle('active', c.dataset.category === category);
  });
}

// ============================================================
// CART MANAGEMENT
// ============================================================
function getCart() { return DB.get('cart') || []; }
function saveCart(cart) { DB.set('cart', cart); updateCartUI(); }

function addToCart(itemId) {
  const menu = DB.get('menu') || [];
  const item = menu.find(m => m.id === itemId);
  if (!item) return;
  const cart = getCart();
  const existing = cart.find(c => c.id === itemId);
  if (existing) { existing.qty += 1; }
  else { cart.push({ ...item, qty: 1 }); }
  saveCart(cart);
  showToast(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
  let cart = getCart();
  cart = cart.filter(c => c.id !== itemId);
  saveCart(cart);
}

function updateCartQty(itemId, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === itemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(itemId); return; }
  saveCart(cart);
}

function updateCartUI() {
  const cart = getCart();
  const badge = document.getElementById('cart-badge');
  const countLabel = document.getElementById('cart-count-label');
  const container = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty');
  const footer = document.getElementById('cart-footer');

  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);
  const subtotal = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = cart.length > 0 ? 49 : 0;
  const total = subtotal + tax + deliveryFee;

  if (totalItems > 0) { badge.style.display = 'grid'; badge.textContent = totalItems; }
  else { badge.style.display = 'none'; }
  countLabel.textContent = totalItems;

  if (cart.length === 0) {
    emptyState.style.display = 'block'; footer.style.display = 'none';
    container.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }
  emptyState.style.display = 'none'; footer.style.display = 'block';

  const itemsHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" width="64" height="64"></div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty('${item.id}',-1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}',1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove ${item.name}">🗑</button>
    </div>
  `).join('');

  container.querySelectorAll('.cart-item').forEach(el => el.remove());
  container.insertAdjacentHTML('beforeend', itemsHTML);

  document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('cart-tax').textContent = formatPrice(tax);
  document.getElementById('cart-total').textContent = formatPrice(total);
}

function toggleCart() {
  document.getElementById('cart-overlay').classList.toggle('open');
  updateCartUI();
}

function proceedToCheckout() {
  if (getCart().length === 0) { showToast('Your cart is empty!', 'error'); return; }
  toggleCart();
  navigateTo('payment');
}

// ============================================================
// CHECKOUT / PAYMENT
// ============================================================
function renderCheckout() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
  const tax = subtotal * 0.05;
  const deliveryFee = cart.length > 0 ? 49 : 0;
  const total = subtotal + tax + deliveryFee;

  const listEl = document.getElementById('checkout-items-list');
  listEl.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.name} × ${item.qty}</span>
      <span>${formatPrice(item.price * item.qty)}</span>
    </div>
  `).join('') + `
    <div class="summary-item"><span>Delivery Fee</span><span>${formatPrice(deliveryFee)}</span></div>
    <div class="summary-item"><span>GST (5%)</span><span>${formatPrice(tax)}</span></div>
  `;

  document.getElementById('checkout-total').textContent = formatPrice(total);
  document.getElementById('pay-total').textContent = formatPrice(total);
  const cashDetailAmount = document.getElementById('cash-detail-amount');
  if (cashDetailAmount) cashDetailAmount.textContent = formatPrice(total);

  const user = DB.get('currentUser');
  if (user) {
    document.getElementById('checkout-name').value = `${user.fname} ${user.lname}`;
    document.getElementById('checkout-phone').value = user.phone || '';
    document.getElementById('checkout-address').value = user.address || '';
  }
}

let selectedPaymentMethod = 'upi'; // track currently selected payment method

function selectPayment(el, method) {
  document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
  el.classList.add('active');
  selectedPaymentMethod = method;
  // Show/hide relevant payment detail sections
  document.getElementById('card-details').style.display = method === 'card' ? 'block' : 'none';
  document.getElementById('upi-details').style.display = method === 'upi' ? 'block' : 'none';
  document.getElementById('netbanking-details').style.display = method === 'netbanking' ? 'block' : 'none';
  const cashEl = document.getElementById('cash-details');
  if (cashEl) cashEl.style.display = method === 'cash' ? 'block' : 'none';

  const payBtn = document.getElementById('pay-btn');
  const totalText = document.getElementById('checkout-total')?.textContent || '₹0.00';
  if (method === 'cash') {
    payBtn.innerHTML = `💵 Place Order (Cash on Delivery) — <span id="pay-total">${totalText}</span>`;
    payBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else {
    payBtn.innerHTML = `🛒 Place Order — <span id="pay-total">${totalText}</span>`;
    payBtn.style.background = '';
  }
}

function processPayment(e) {
  e.preventDefault();
  const cart = getCart();
  if (cart.length === 0) { showToast('Your cart is empty!', 'error'); return; }

  // Validate delivery details
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  if (!name || !phone || !address) { showToast('Please fill in all delivery details', 'error'); return; }

  const subtotal = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax + 49;

  // Payment method validation — UPI & Net Banking MUST pay first
  if (selectedPaymentMethod === 'upi') {
    showUPIPaymentDialog(total);
    return;
  }

  if (selectedPaymentMethod === 'netbanking') {
    showNetBankingPaymentDialog(total);
    return;
  }

  if (selectedPaymentMethod === 'card') {
    const cardNum = document.getElementById('card-number').value.trim();
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCvv = document.getElementById('card-cvv').value.trim();
    if (!cardNum || !cardExpiry || !cardCvv) {
      showToast('Please fill in all card details', 'error');
      return;
    }
    showCardPaymentDialog(total, cardNum);
    return;
  }

  // Cash on Delivery — confirm and place order
  if (selectedPaymentMethod === 'cash') {
    showCashConfirmationDialog(total, address);
    return;
  }
}

// ---- CASH ON DELIVERY CONFIRMATION ----
function showCashConfirmationDialog(total, address) {
  const dialog = document.getElementById('payment-confirm-dialog');
  document.getElementById('payment-confirm-body').innerHTML = `
    <div style="font-size:3rem;margin-bottom:8px">💵</div>
    <h3 style="font-size:1.25rem;margin-bottom:6px">Confirm Cash on Delivery</h3>
    <p style="color:var(--clr-text-muted);font-size:.88rem;margin-bottom:16px">
      Total payable: <strong style="color:#22c55e;font-size:1.2rem">₹${total.toFixed(2)}</strong> in cash at your doorstep upon delivery.
    </p>
    <div style="background:var(--clr-bg-alt);border:1px solid var(--clr-surface-border);border-radius:var(--radius-md);padding:14px;text-align:left;margin-bottom:18px;font-size:.85rem">
      <p style="color:var(--clr-text-muted);margin-bottom:3px">📍 Delivery Address:</p>
      <p style="font-weight:600;margin-bottom:8px">${address}</p>
      <p style="color:var(--clr-text-muted);margin-bottom:3px">💵 Payment Mode:</p>
      <p style="font-weight:600;color:#22c55e">Cash on Delivery (No online payment required)</p>
    </div>
    <div style="display:flex;gap:12px">
      <button onclick="cancelPayment()" style="flex:1;padding:12px;border-radius:var(--radius-md);border:1.5px solid var(--clr-surface-border);background:transparent;color:var(--clr-text);cursor:pointer;font-weight:600">Cancel</button>
      <button onclick="confirmCashOrder()" class="btn btn-primary" style="flex:1;padding:12px;font-size:.95rem;background:linear-gradient(135deg,#22c55e,#16a34a);border:none;box-shadow:0 4px 16px rgba(34,197,94,.3)">✅ Confirm Order</button>
    </div>
  `;
  dialog.showModal();
}

function confirmCashOrder() {
  document.getElementById('payment-confirm-dialog').close();
  showToast('Placing Cash on Delivery order...', 'info');
  setTimeout(() => {
    placeOrder('Cash on Delivery', 'COD-' + Math.floor(100000 + Math.random() * 900000));
  }, 600);
}

// ---- UPI PAYMENT: Must scan QR, pay, and enter UTR ----
function showUPIPaymentDialog(total) {
  const dialog = document.getElementById('payment-confirm-dialog');
  document.getElementById('payment-confirm-body').innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:8px">📱</div>
    <h3 style="font-size:1.2rem;margin-bottom:4px">Pay ₹${total.toFixed(2)} via UPI</h3>
    <p style="color:var(--clr-text-muted);font-size:.85rem;margin-bottom:16px">Scan the QR code using PhonePe, Google Pay, Paytm or any UPI app and complete the payment</p>
    <div style="background:#fff;border-radius:12px;padding:12px;display:inline-block;margin-bottom:12px">
      <img src="images/phonepe-qr.jpg" alt="PhonePe QR" style="width:180px;height:auto;border-radius:6px">
    </div>
    <p style="font-weight:600;font-size:.92rem;margin-bottom:2px">INDUKURU MANVITHA</p>
    <p style="font-size:.78rem;color:var(--clr-text-muted);margin-bottom:8px">PhonePe · UPI Payments</p>
    <div style="padding:8px 16px;background:var(--clr-bg-alt);border:1px dashed var(--clr-primary);border-radius:var(--radius-md);display:inline-block;margin-bottom:16px">
      <p style="font-size:.72rem;color:var(--clr-text-muted);margin-bottom:1px">Or pay directly to UPI ID:</p>
      <p style="font-weight:700;font-family:monospace;font-size:.95rem;color:var(--clr-primary);letter-spacing:.5px">8639866865@ybl</p>
    </div>
    <div style="background:rgba(255,107,53,.08);border:1px solid rgba(255,107,53,.2);border-radius:var(--radius-md);padding:12px;margin-bottom:16px;text-align:left">
      <p style="font-size:.82rem;color:#ff6b35;font-weight:600">⚠️ Important:</p>
      <p style="font-size:.82rem;color:var(--clr-text-muted)">After paying, enter your <strong>UTR / Transaction ID</strong> below and click <strong>Confirm Payment</strong>. Your order will NOT be placed without confirmation.</p>
    </div>
    <div id="utr-entry-section">
      <div style="text-align:left;margin-bottom:12px">
        <label style="font-size:.85rem;font-weight:600;display:block;margin-bottom:6px">UTR / Transaction Reference Number *</label>
        <input type="text" id="payment-utr-input" class="form-control" placeholder="e.g. 412345678901 or TXN123456789" style="font-family:monospace;letter-spacing:1px" required>
        <p style="font-size:.75rem;color:var(--clr-text-muted);margin-top:4px">You can find this in your UPI app under transaction history</p>
      </div>
      <button onclick="confirmUTR()" style="width:100%;padding:12px;border-radius:var(--radius-md);border:none;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;cursor:pointer;font-weight:700;font-size:.95rem;margin-bottom:12px;transition:transform .15s,box-shadow .15s" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 4px 16px rgba(59,130,246,.3)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">🔒 Confirm Payment</button>
    </div>
    <div id="utr-confirmed-section" style="display:none">
      <div style="background:rgba(34,197,94,.1);border:1.5px solid rgba(34,197,94,.3);border-radius:var(--radius-md);padding:16px;margin-bottom:16px">
        <div style="font-size:2rem;margin-bottom:4px">✅</div>
        <p style="font-weight:700;color:#22c55e;font-size:1rem;margin-bottom:4px">Payment Confirmed!</p>
        <p style="font-size:.82rem;color:var(--clr-text-muted)">Reference: <strong id="confirmed-utr-display" style="font-family:monospace;color:var(--clr-text)"></strong></p>
      </div>
    </div>
    <div style="display:flex;gap:12px">
      <button onclick="cancelPayment()" style="flex:1;padding:12px;border-radius:var(--radius-md);border:1.5px solid var(--clr-surface-border);background:transparent;color:var(--clr-text);cursor:pointer;font-weight:600">Cancel</button>
      <button id="place-order-btn" onclick="placeConfirmedOrder('UPI')" class="btn btn-primary" style="flex:1;padding:12px;font-size:.95rem;opacity:.4;pointer-events:none">🛒 Place Order</button>
    </div>
  `;
  dialog.showModal();
}

// ---- NET BANKING PAYMENT: Must transfer and enter reference ----
function showNetBankingPaymentDialog(total) {
  const bank = document.getElementById('bank-select').value;
  if (!bank) { showToast('Please select your bank first', 'error'); return; }
  const bankName = document.getElementById('bank-select').options[document.getElementById('bank-select').selectedIndex].text;

  const dialog = document.getElementById('payment-confirm-dialog');
  document.getElementById('payment-confirm-body').innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:8px">🏦</div>
    <h3 style="font-size:1.2rem;margin-bottom:4px">Pay ₹${total.toFixed(2)} via Net Banking</h3>
    <p style="color:var(--clr-text-muted);font-size:.85rem;margin-bottom:16px">Transfer the amount to the below account using <strong>${bankName}</strong> net banking</p>
    <div style="background:var(--clr-bg-alt);border-radius:var(--radius-md);padding:16px;margin-bottom:16px;text-align:left;border:1px solid var(--clr-surface-border)">
      <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:.88rem">
        <span style="color:var(--clr-text-muted)">Account Name:</span>
        <span style="font-weight:600">INDUKURU MANVITHA</span>
        <span style="color:var(--clr-text-muted)">Account No:</span>
        <span style="font-weight:700;font-family:monospace;letter-spacing:1px">057012010001748</span>
        <span style="color:var(--clr-text-muted)">IFSC Code:</span>
        <span style="font-weight:700;font-family:monospace;letter-spacing:1px">UBIN0805700</span>
        <span style="color:var(--clr-text-muted)">Bank:</span>
        <span style="font-weight:600">Union Bank of India</span>
        <span style="color:var(--clr-text-muted)">Amount:</span>
        <span style="font-weight:800;color:var(--clr-primary)">₹${total.toFixed(2)}</span>
      </div>
    </div>
    <div style="background:rgba(255,107,53,.08);border:1px solid rgba(255,107,53,.2);border-radius:var(--radius-md);padding:12px;margin-bottom:16px;text-align:left">
      <p style="font-size:.82rem;color:#ff6b35;font-weight:600">⚠️ Important:</p>
      <p style="font-size:.82rem;color:var(--clr-text-muted)">After completing the transfer, enter your <strong>Transaction Reference Number</strong> and click <strong>Confirm Payment</strong>.</p>
    </div>
    <div id="utr-entry-section">
      <div style="text-align:left;margin-bottom:12px">
        <label style="font-size:.85rem;font-weight:600;display:block;margin-bottom:6px">Transaction Reference Number *</label>
        <input type="text" id="payment-utr-input" class="form-control" placeholder="e.g. NEFT/IMPS/RTGS reference number" style="font-family:monospace;letter-spacing:1px" required>
        <p style="font-size:.75rem;color:var(--clr-text-muted);margin-top:4px">You will receive this from your bank after the transfer</p>
      </div>
      <button onclick="confirmUTR()" style="width:100%;padding:12px;border-radius:var(--radius-md);border:none;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;cursor:pointer;font-weight:700;font-size:.95rem;margin-bottom:12px;transition:transform .15s,box-shadow .15s" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 4px 16px rgba(59,130,246,.3)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">🔒 Confirm Payment</button>
    </div>
    <div id="utr-confirmed-section" style="display:none">
      <div style="background:rgba(34,197,94,.1);border:1.5px solid rgba(34,197,94,.3);border-radius:var(--radius-md);padding:16px;margin-bottom:16px">
        <div style="font-size:2rem;margin-bottom:4px">✅</div>
        <p style="font-weight:700;color:#22c55e;font-size:1rem;margin-bottom:4px">Payment Confirmed!</p>
        <p style="font-size:.82rem;color:var(--clr-text-muted)">Reference: <strong id="confirmed-utr-display" style="font-family:monospace;color:var(--clr-text)"></strong></p>
      </div>
    </div>
    <div style="display:flex;gap:12px">
      <button onclick="cancelPayment()" style="flex:1;padding:12px;border-radius:var(--radius-md);border:1.5px solid var(--clr-surface-border);background:transparent;color:var(--clr-text);cursor:pointer;font-weight:600">Cancel</button>
      <button id="place-order-btn" onclick="placeConfirmedOrder('Net Banking — ${bankName}')" class="btn btn-primary" style="flex:1;padding:12px;font-size:.95rem;opacity:.4;pointer-events:none">🛒 Place Order</button>
    </div>
  `;
  dialog.showModal();
}

// ---- CARD PAYMENT: Simulated OTP verification ----
function showCardPaymentDialog(total, cardNum) {
  const last4 = cardNum.slice(-4);
  const dialog = document.getElementById('payment-confirm-dialog');
  document.getElementById('payment-confirm-body').innerHTML = `
    <div style="font-size:2.5rem;margin-bottom:8px">💳</div>
    <h3 style="font-size:1.2rem;margin-bottom:4px">Confirm Card Payment</h3>
    <p style="color:var(--clr-text-muted);font-size:.85rem;margin-bottom:16px">Paying ₹${total.toFixed(2)} with card ending <strong>**** ${last4}</strong></p>
    <div id="utr-entry-section">
      <div style="text-align:left;margin-bottom:12px">
        <label style="font-size:.85rem;font-weight:600;display:block;margin-bottom:6px">Enter OTP sent to your registered mobile *</label>
        <input type="text" id="payment-utr-input" class="form-control" placeholder="Enter 6-digit OTP" maxlength="6" style="font-family:monospace;letter-spacing:4px;text-align:center;font-size:1.2rem" required>
        <p style="font-size:.75rem;color:var(--clr-text-muted);margin-top:4px">A one-time password has been sent to your registered number</p>
      </div>
      <button onclick="confirmUTR()" style="width:100%;padding:12px;border-radius:var(--radius-md);border:none;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;cursor:pointer;font-weight:700;font-size:.95rem;margin-bottom:12px;transition:transform .15s,box-shadow .15s" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 4px 16px rgba(59,130,246,.3)'" onmouseout="this.style.transform='scale(1)';this.style.boxShadow='none'">🔒 Verify OTP</button>
    </div>
    <div id="utr-confirmed-section" style="display:none">
      <div style="background:rgba(34,197,94,.1);border:1.5px solid rgba(34,197,94,.3);border-radius:var(--radius-md);padding:16px;margin-bottom:16px">
        <div style="font-size:2rem;margin-bottom:4px">✅</div>
        <p style="font-weight:700;color:#22c55e;font-size:1rem;margin-bottom:4px">Payment Verified!</p>
        <p style="font-size:.82rem;color:var(--clr-text-muted)">Card: **** ${last4} · OTP confirmed</p>
      </div>
    </div>
    <div style="display:flex;gap:12px">
      <button onclick="cancelPayment()" style="flex:1;padding:12px;border-radius:var(--radius-md);border:1.5px solid var(--clr-surface-border);background:transparent;color:var(--clr-text);cursor:pointer;font-weight:600">Cancel</button>
      <button id="place-order-btn" onclick="placeConfirmedOrder('Card **** ${last4}')" class="btn btn-primary" style="flex:1;padding:12px;font-size:.95rem;opacity:.4;pointer-events:none">🛒 Place Order</button>
    </div>
  `;
  dialog.showModal();
}

// Store confirmed UTR globally for use in placeConfirmedOrder
let confirmedPaymentRef = '';

// ---- STEP 1: Confirm UTR / OTP ----
function confirmUTR() {
  const utrInput = document.getElementById('payment-utr-input');
  const utr = utrInput ? utrInput.value.trim() : '';

  if (!utr) {
    showToast('❌ Please enter your UTR / Transaction Reference Number', 'error');
    utrInput.style.border = '2px solid #ef4444';
    utrInput.focus();
    return;
  }

  if (utr.length < 4) {
    showToast('❌ Invalid reference number. Please check and try again.', 'error');
    utrInput.style.border = '2px solid #ef4444';
    utrInput.focus();
    return;
  }

  // Save reference and show confirmed state
  confirmedPaymentRef = utr;

  // Show loading
  showToast('Verifying payment...', 'info');
  setTimeout(() => {
    // Hide entry section, show confirmed section
    document.getElementById('utr-entry-section').style.display = 'none';
    const confirmedSection = document.getElementById('utr-confirmed-section');
    confirmedSection.style.display = 'block';
    const utrDisplay = document.getElementById('confirmed-utr-display');
    if (utrDisplay) utrDisplay.textContent = utr;

    // Enable the Place Order button
    const placeBtn = document.getElementById('place-order-btn');
    placeBtn.style.opacity = '1';
    placeBtn.style.pointerEvents = 'auto';

    showToast('✅ Payment confirmed! You can now place your order.', 'success');
  }, 1200);
}

// ---- STEP 2: Place Order (only after confirmation) ----
function placeConfirmedOrder(paymentMethod) {
  if (!confirmedPaymentRef) {
    showToast('❌ Payment not confirmed. Please confirm your payment first.', 'error');
    return;
  }

  document.getElementById('payment-confirm-dialog').close();
  showToast('Processing your order...', 'info');
  setTimeout(() => {
    placeOrder(paymentMethod, confirmedPaymentRef);
    confirmedPaymentRef = ''; // Reset
  }, 800);
}

function cancelPayment() {
  confirmedPaymentRef = '';
  document.getElementById('payment-confirm-dialog').close();
  showToast('Payment cancelled — order not placed', 'info');
}

function placeOrder(paymentMethod, paymentRef) {
  const cart = getCart();
  const subtotal = cart.reduce((sum, c) => sum + (c.price * c.qty), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax + 49;

  const orders = DB.get('orders') || [];
  const orderId = `ORD-${String(orders.length + 1).padStart(3, '0')}`;
  const newOrder = {
    id: orderId,
    customer: document.getElementById('checkout-name').value,
    email: DB.get('currentUser')?.email || 'guest@example.com',
    items: cart.map(c => `${c.name} x${c.qty}`),
    total: total,
    paymentMethod: paymentMethod,
    paymentRef: paymentRef || '',
    status: 'pending',
    date: new Date().toISOString().slice(0, 10),
    address: document.getElementById('checkout-address').value,
    timeline: [
      { step: 'Order Placed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true, active: true },
      { step: 'Confirmed by Restaurant', time: '', done: false },
      { step: 'Preparing Your Food', time: '', done: false },
      { step: 'Out for Delivery', time: '', done: false },
      { step: 'Delivered', time: '', done: false },
    ]
  };
  orders.push(newOrder);
  DB.set('orders', orders);
  DB.set('cart', []);
  updateCartUI();

  showToast(`Order ${orderId} placed successfully! 🎉 (Paid via ${paymentMethod})`, 'success');
  setTimeout(() => {
    navigateTo('tracking');
    document.getElementById('track-order-id').value = orderId;
    trackOrder();
  }, 1000);
}

// ============================================================
// ORDER TRACKING
// ============================================================
function trackOrder() {
  const orderId = document.getElementById('track-order-id').value.trim().toUpperCase();
  const orders = DB.get('orders') || [];
  const order = orders.find(o => o.id === orderId);
  const container = document.getElementById('tracking-result');

  if (!order) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--clr-text-muted)">
        <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
        <p>No order found with ID <strong>${orderId}</strong></p>
        <p style="font-size:.85rem;margin-top:8px">Please check your order ID and try again.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px">
      <div>
        <h3 style="font-size:1.3rem">${order.id}</h3>
        <p style="font-size:.88rem;color:var(--clr-text-muted)">${order.customer} · ${order.date}</p>
      </div>
      <span class="status-pill ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
    </div>
    <div style="padding:16px;border-radius:var(--radius-md);background:var(--clr-bg-alt);margin:16px 0">
      <p style="font-size:.88rem;color:var(--clr-text-muted);margin-bottom:6px">📦 Items:</p>
      <p style="font-weight:500">${order.items.join(', ')}</p>
      <p style="margin-top:10px;font-size:.88rem;color:var(--clr-text-muted)">📍 Delivery: ${order.address}</p>
      <p style="margin-top:6px;font-size:.88rem;color:var(--clr-text-muted)">💵 Payment: <strong style="color:var(--clr-text)">${order.paymentMethod || 'Cash on Delivery'}</strong> ${order.paymentRef ? `<span style="font-family:monospace">(${order.paymentRef})</span>` : ''}</p>
      <p style="margin-top:6px;font-weight:700;color:var(--clr-primary)">Total: ${formatPrice(order.total)}</p>
    </div>
    <h4 style="margin-bottom:8px">Delivery Timeline</h4>
    <div class="tracking-timeline">
      ${order.timeline.map(t => `
        <div class="timeline-item ${t.done ? 'completed' : ''} ${t.active ? 'active' : ''}">
          <div class="timeline-dot">${t.done ? '✓' : ''}</div>
          <h4>${t.step}</h4>
          <p class="time">${t.time || 'Pending...'}</p>
        </div>
      `).join('')}
    </div>`;
}

// ============================================================
// ADMIN PANEL
// ============================================================
function renderAdminPanel() {
  const orders = DB.get('orders') || [];
  const menu = DB.get('menu') || [];
  const users = DB.get('users') || [];

  document.getElementById('admin-total-orders').textContent = orders.length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  document.getElementById('admin-revenue').textContent = formatPrice(revenue);
  document.getElementById('admin-menu-items').textContent = menu.length;
  document.getElementById('admin-customers').textContent = users.length;

  document.getElementById('admin-orders-body').innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${o.items.join(', ')}</td>
      <td>${formatPrice(o.total)}</td>
      <td><span class="status-pill ${o.status}">${o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span></td>
      <td><button class="action-btn edit" onclick="updateOrderStatus('${o.id}')">Update</button></td>
    </tr>
  `).join('');

  document.getElementById('admin-menu-body').innerHTML = menu.map(m => `
    <tr>
      <td><strong>${m.name}</strong></td>
      <td>${m.category}</td>
      <td>${formatPrice(m.price)}</td>
      <td>${m.restaurant}</td>
      <td><button class="action-btn delete" onclick="deleteMenuItem('${m.id}')">Delete</button></td>
    </tr>
  `).join('');
}

function addMenuItem(e) {
  e.preventDefault();
  const menu = DB.get('menu') || [];
  const category = document.getElementById('new-item-category').value;
  const newItem = {
    id: 'm' + Date.now(),
    name: document.getElementById('new-item-name').value,
    price: parseFloat(document.getElementById('new-item-price').value),
    category: category,
    restaurant: document.getElementById('new-item-restaurant').value,
    description: document.getElementById('new-item-desc').value,
    image: IMAGE_MAP[category] || IMAGE_MAP.burger,
  };
  menu.push(newItem);
  DB.set('menu', menu);
  showToast(`${newItem.name} added to menu!`, 'success');
  document.getElementById('add-menu-form').reset();
  renderAdminPanel();
}

function deleteMenuItem(itemId) {
  let menu = DB.get('menu') || [];
  const item = menu.find(m => m.id === itemId);
  menu = menu.filter(m => m.id !== itemId);
  DB.set('menu', menu);
  showToast(`${item?.name || 'Item'} removed from menu`, 'info');
  renderAdminPanel();
}

function updateOrderStatus(orderId) {
  const orders = DB.get('orders') || [];
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const statusFlow = ['pending', 'preparing', 'out_for_delivery', 'delivered'];
  const currentIdx = statusFlow.indexOf(order.status);
  if (currentIdx < statusFlow.length - 1) {
    order.status = statusFlow[currentIdx + 1];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Clear all active flags first
    order.timeline.forEach(t => t.active = false);
    
    if (order.status === 'preparing') {
      // Step 1 (Confirmed) done, Step 2 (Preparing) active
      order.timeline[1].done = true;
      order.timeline[1].time = now;
      order.timeline[2].active = true;
    } else if (order.status === 'out_for_delivery') {
      // Steps 1-2 done, Step 3 (Out for Delivery) active
      order.timeline[1].done = true;
      order.timeline[2].done = true;
      order.timeline[2].time = now;
      order.timeline[3].active = true;
    } else if (order.status === 'delivered') {
      // ALL steps done — fully completed
      order.timeline.forEach((t, i) => {
        t.done = true;
        t.active = false;
        if (!t.time) t.time = now;
      });
      // Mark last step specially
      order.timeline[4].time = now;
    }
    
    DB.set('orders', orders);
    const displayStatus = order.status === 'out_for_delivery' ? 'Out for Delivery' : order.status.charAt(0).toUpperCase() + order.status.slice(1);
    showToast(`Order ${orderId} updated to: ${displayStatus}`, 'success');
    renderAdminPanel();
  } else {
    showToast(`Order ${orderId} is already delivered`, 'info');
  }
}

// ============================================================
// AUTH — User Authentication
// ============================================================
function openAuthDialog(tab = 'login') {
  switchAuthTab(tab);
  document.getElementById('auth-dialog').showModal();
}

function closeAuthDialog() { document.getElementById('auth-dialog').close(); }

document.getElementById('auth-dialog').addEventListener('click', function(e) {
  if (e.target === this) this.close();
});

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signup-form').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('auth-dialog-title').textContent = tab === 'login' ? 'Welcome Back' : 'Create Account';
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const users = DB.get('users') || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    DB.set('currentUser', user);
    updateAuthUI();
    closeAuthDialog();
    showToast(`Welcome back, ${user.fname}! 👋`, 'success');
  } else {
    showToast('Invalid email or password', 'error');
  }
}

function handleSignup(e) {
  e.preventDefault();
  const newUser = {
    id: 'u' + Date.now(),
    fname: document.getElementById('signup-fname').value,
    lname: document.getElementById('signup-lname').value,
    email: document.getElementById('signup-email').value,
    phone: document.getElementById('signup-phone').value,
    password: document.getElementById('signup-password').value,
    address: document.getElementById('signup-address').value,
    createdAt: new Date().toISOString(),
  };
  const users = DB.get('users') || [];
  if (users.some(u => u.email === newUser.email)) {
    showToast('An account with this email already exists', 'error');
    return;
  }
  users.push(newUser);
  DB.set('users', users);
  DB.set('currentUser', newUser);
  updateAuthUI();
  closeAuthDialog();
  showToast(`Welcome to FoodFleet, ${newUser.fname}! 🎉`, 'success');
}

function updateAuthUI() {
  const user = DB.get('currentUser');
  const authButtons = document.getElementById('auth-buttons');
  const userArea = document.getElementById('user-area');
  if (user) {
    authButtons.style.display = 'none'; userArea.style.display = 'flex';
    document.getElementById('user-avatar').textContent = (user.fname[0] + user.lname[0]).toUpperCase();
    document.getElementById('user-display-name').textContent = user.fname;
  } else {
    authButtons.style.display = 'flex'; userArea.style.display = 'none';
  }
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('exiting');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initializeData();
  renderFeaturedRestaurants();
  renderMenuItems();
  updateCartUI();
  updateAuthUI();
  trackOrder();
});
