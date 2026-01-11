import mongoose from "mongoose";
import Diets from "../models/diets.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/jyaanbanau");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const dietPlans = [
    // --- High Protein / Muscle Gain ---
    {
        planName: "High Protein Muscle Builder",
        proteinLevel: "High",
        dailyCalories: 2800,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        description: "A perfect high-protein diet designed for muscle gain and recovery. Includes lean meats, eggs, and protein-rich legumes.",
        dietaryDetails: {
            include: ["Chicken Breast", "Lean Beef", "Eggs", "Greek Yogurt", "Quinoa", "Almonds"],
            avoid: ["Processed Meats", "Sugary Drinks", "Deep Fried Foods"],
            sampleMenu: {
                breakfast: "3 scrambled eggs with spinach and whole wheat toast",
                lunch: "Grilled chicken breast with quinoa and roasted broccoli",
                dinner: "Lean beef stir-fry with mixed vegetables and brown rice",
                snack: "Greek yogurt with a handful of almonds"
            }
        }
    },
    {
        planName: "Lean Gains Formula",
        proteinLevel: "High",
        dailyCalories: 2600,
        image: "https://images.unsplash.com/photo-1604908177453-7462950a6a3b",
        description: "Optimized for building lean muscle without adding excess fat. Focuses on chicken breast, turkey, and complex carbs.",
        dietaryDetails: {
            include: ["Turkey Breast", "White Fish", "Sweet Potatoes", "Oats", "Cottage Cheese"],
            avoid: ["High Sugar Fruits", "Alcohol", "Fatty Cuts of Meat"],
            sampleMenu: {
                breakfast: "Oatmeal with protein powder and blueberries",
                lunch: "Turkey wrap with whole grain tortilla and plenty of greens",
                dinner: "Baked cod with sweet potato wedges and asparagus",
                snack: "Cottage cheese with pineapple chunks"
            }
        }
    },
    {
        planName: "Powerlifter's Feast",
        proteinLevel: "High",
        dailyCalories: 3500,
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435",
        description: "Heavy calorie load with massive protein intake for strength athletes. Steak, salmon, and dense carb sources.",
        dietaryDetails: {
            include: ["Ribeye Steak", "Salmon", "Whole Milk", "Pasta", "Peanut Butter"],
            avoid: ["Low Calorie Foods", "Skipping Meals"],
            sampleMenu: {
                breakfast: "4 eggs, bacon, and a stack of pancakes",
                lunch: "Double burger (no cheese) with baked potato",
                dinner: "Large salmon fillet with creamy parmesan pasta",
                snack: "Protein shake with peanut butter and banana"
            }
        }
    },
    {
        planName: "Athlete's Performance Mix",
        proteinLevel: "High",
        dailyCalories: 3000,
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6",
        description: "Balanced for high-output sports. Combines high protein with timing-specific carbohydrate loading.",
        dietaryDetails: {
            include: ["Lean Pork", "Brown Rice", "Bananas", "Isotonic Drinks", "Trail Mix"],
            avoid: ["Heavy Cream based sauces", "New untested foods before events"],
            sampleMenu: {
                breakfast: "English muffin with egg whites and turkey bacon",
                lunch: "Rice bowl with pork tenderloin and peppers",
                dinner: "Spaghetti bolognese with lean mince",
                snack: "Banana and an energy bar"
            }
        }
    },
    {
        planName: "Bodybuilder's Cut",
        proteinLevel: "High",
        dailyCalories: 2400,
        image: "https://images.unsplash.com/photo-1587586062323-836089e60d52",
        description: "High protein but lower carbs to shred fat while maintaining muscle mass. Egg whites, fish, and broccoli.",
        dietaryDetails: {
            include: ["Egg Whites", "Tilapia", "Asparagus", "Cucumber", "Black Coffee"],
            avoid: ["Dairy", "Bread", "Fruit Juices", "Sauces with sugar"],
            sampleMenu: {
                breakfast: "Omelet made with 6 egg whites and mushrooms",
                lunch: "Grilled tilapia with steamed asparagus",
                dinner: "Chicken salad with lemon dressing (no oil)",
                snack: "Celery sticks"
            }
        }
    },

    // --- Keto / Low Carb ---
    {
        planName: "Keto Fat Burner",
        proteinLevel: "Medium",
        dailyCalories: 2200,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554",
        description: "Low-carb, high-fat ketogenic diet to accelerate fat burning. Rich in avocados, oils, and fatty fish.",
        dietaryDetails: {
            include: ["Avocado", "Bacon", "Butter", "Mackerel", "Walnuts"],
            avoid: ["Bread", "Pasta", "Sugar", "Potatoes", "Legumes"],
            sampleMenu: {
                breakfast: "Bulletproof coffee and bacon",
                lunch: "Avocado and tuna salad with olive oil",
                dinner: "Fatty steak with buttered spinach",
                snack: "Handful of walnuts"
            }
        }
    },
    {
        planName: "Strict Keto Lifestyle",
        proteinLevel: "Medium",
        dailyCalories: 2000,
        image: "https://images.unsplash.com/photo-1517950354125-9ef0052ad4d0",
        description: "Strict <20g carbs per day. Focus on MCT oils, grass-fed beef, and nuts.",
        dietaryDetails: {
            include: ["MCT Oil", "Grass-fed Beef", "Macadamia Nuts", "Cheese", "Eggs"],
            avoid: ["Carrots", "Fruits (except berries)", "Grains"],
            sampleMenu: {
                breakfast: "Scrambled eggs with cheddar cheese",
                lunch: "Burger patty wrapped in lettuce with mayo",
                dinner: "Baked salmon with garlic butter",
                snack: "Macadamia nuts"
            }
        }
    },
    {
        planName: "Cyclical Keto",
        proteinLevel: "High",
        dailyCalories: 2400,
        image: "https://images.unsplash.com/photo-1563588258667-a006dfa35c52",
        description: "Keto during the week, carb-refuel on weekends. Great for social eaters enabling metabolic flexibility.",
        dietaryDetails: {
            include: ["Coconut Oil", "Sardines", "Weekends: Rice/Potatoes", "Dark Chocolate"],
            avoid: ["Carbs on weekdays", "Processed snacks on weekends"],
            sampleMenu: {
                breakfast: "Keto pancakes made with almond flour (Weekdays)",
                lunch: "Sardine salad with olives",
                dinner: "Roast chicken with broccoli",
                snack: "90% Dark chocolate square"
            }
        }
    },
    {
        planName: "Low Carb & Light",
        proteinLevel: "Medium",
        dailyCalories: 1600,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
        description: "Not quite keto, but significantly reduced carbs to maintain steady blood sugar levels. Salads and grilled proteins.",
        dietaryDetails: {
            include: ["Zucchini Noodles", "Grilled Chicken", "Berries", "Greek Yogurt"],
            avoid: ["White Bread", "Pastries", "Soda"],
            sampleMenu: {
                breakfast: "Yogurt with strawberries",
                lunch: "Chicken caesar salad (no croutons)",
                dinner: "Zucchini noodles with pesto and shrimp",
                snack: "Hard boiled egg"
            }
        }
    },

    // --- Balanced / Lifestyle ---
    {
        planName: "Balanced Carbs Energy",
        proteinLevel: "Medium",
        dailyCalories: 2500,
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
        description: "A balanced approach with complex carbohydrates. Great for reliable energy throughout the work day.",
        dietaryDetails: {
            include: ["Whole Grains", "Lean Proteins", "Fruits", "Vegetables", "Dairy"],
            avoid: ["Excessive Junk Food", "Skipping Breakfast"],
            sampleMenu: {
                breakfast: "Whole grain toast with avocado and egg",
                lunch: "Turkey sandwich with apple slices",
                dinner: "Grilled salmon with quinoa and peas",
                snack: "Cheese stick and an orange"
            }
        }
    },
    {
        planName: "Mediterranean Wellness",
        proteinLevel: "Medium",
        dailyCalories: 2100,
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        description: "The gold standard for heart health. Olive oil, whole grains, fish, and plenty of vegetables.",
        dietaryDetails: {
            include: ["Olive Oil", "Tomatoes", "Fish", "Whole Grains", "Legumes"],
            avoid: ["Red Meat", "Butter", "Processed Foods"],
            sampleMenu: {
                breakfast: "Greek yogurt with honey and walnuts",
                lunch: "Lentil soup with whole grain bread",
                dinner: "Baked fish with mediterranean salad (tomatoes, cucumber, feta)",
                snack: "Hummus with carrot sticks"
            }
        }
    },
    {
        planName: "Paleo Primal",
        proteinLevel: "High",
        dailyCalories: 2300,
        image: "https://images.unsplash.com/photo-1459708681156-254fbba3692d",
        description: "Eat like a caveman. No processed foods, grains, or dairy. Just meat, fish, fruits, and veggies.",
        dietaryDetails: {
            include: ["Grass-fed Meat", "Fish", "Eggs", "Vegetables", "Fruits", "Nuts"],
            avoid: ["Grains", "Legumes", "Dairy", "Refined Sugar", "Vegetable Oils"],
            sampleMenu: {
                breakfast: "Scrambled eggs with peppers and onions",
                lunch: "Salad with grilled chicken, avocado, and seeds",
                dinner: "Steak with roasted root vegetables",
                snack: "Apple slices with almond butter"
            }
        }
    },
    {
        planName: "Whole30 Reset",
        proteinLevel: "Medium",
        dailyCalories: 1800,
        image: "https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3",
        description: "30-day cleaner eating challenge. Eliminates sugar, alcohol, grains, and legumes.",
        dietaryDetails: {
            include: ["Meat", "Seafood", "Eggs", "Vegetables", "Fruit", "Natural Fats"],
            avoid: ["Sugar", "Alcohol", "Grains", "Legumes", "Dairy", "Carrageenan"],
            sampleMenu: {
                breakfast: "Frittata with spinach and tomato",
                lunch: "Chicken salad wrapped in collard greens",
                dinner: "Grilled salmon with roasted sweet potatoes",
                snack: "Cashews and an apple"
            }
        }
    },
    {
        planName: "Flexitarian Approach",
        proteinLevel: "Medium",
        dailyCalories: 2000,
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999",
        description: "Mostly plant-based but allowing occasional meat. Flexible and easy to sustain long-term.",
        dietaryDetails: {
            include: ["Beans", "Lentils", "Tofu", "Whole Grains", "Occasional Poultry/Fish"],
            avoid: ["Processed Meats", "Excessive Red Meat"],
            sampleMenu: {
                breakfast: "Oatmeal with berries and flaxseed",
                lunch: "Black bean burrito bowl with brown rice",
                dinner: "Vegetable stir-fry with a small organic chicken breast",
                snack: "Popcorn (air-popped)"
            }
        }
    },

    // --- Vegan / Vegetarian ---
    {
        planName: "Vegan Plant Power",
        proteinLevel: "High",
        dailyCalories: 2000,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        description: "100% plant-based diet packed with vitamins. Tofu, tempeh, lentils, and quinoa.",
        dietaryDetails: {
            include: ["Tofu", "Tempeh", "Lentils", "Chickpeas", "Quinoa", "Hemp Seeds"],
            avoid: ["Meat", "Dairy", "Eggs", "Honey", "Gelatin"],
            sampleMenu: {
                breakfast: "Tofu scramble with nutritional yeast",
                lunch: "Quinoa salad with chickpeas and lemon dressing",
                dinner: "Lentil curry with basmati rice",
                snack: "Hummus on rice cakes"
            }
        }
    },
    {
        planName: "Vegetarian Vitality",
        proteinLevel: "Medium",
        dailyCalories: 1900,
        image: "https://images.unsplash.com/photo-1538356396919-63346419747a",
        description: "Includes dairy and eggs for easier protein intake while avoiding meat. Varied and colorful meals.",
        dietaryDetails: {
            include: ["Eggs", "Dairy", "Beans", "Vegetables", "Fruits", "Grains"],
            avoid: ["Meat", "Poultry", "Fish", "Shellfish"],
            sampleMenu: {
                breakfast: "Yogurt parfait with granola",
                lunch: "Grilled cheese sandwich with tomato soup",
                dinner: "Vegetable lasagna with ricotta cheese",
                snack: "Hard boiled egg"
            }
        }
    },
    {
        planName: "Raw Vegan Detox",
        proteinLevel: "Low",
        dailyCalories: 1600,
        image: "https://images.unsplash.com/photo-1522502690807-6bb9f8b4d896",
        description: "Uncooked, unprocessed plant foods. Maximizes enzyme intake and digestive rest.",
        dietaryDetails: {
            include: ["Raw Fruits", "Raw Vegetables", "Sprouts", "Nuts", "Seeds"],
            avoid: ["Cooked Foods", "Processed Foods", "Animal Products"],
            sampleMenu: {
                breakfast: "Green smoothie with kale and mango",
                lunch: "Large salad with raw veggies and seed dressing",
                dinner: "Zucchini noodles with raw tomato sauce",
                snack: "Fresh fruit salad"
            }
        }
    },
    {
        planName: "High Protein Vegan",
        proteinLevel: "High",
        dailyCalories: 2300,
        image: "https://images.unsplash.com/photo-1616781290352-7c9808381dd2",
        description: "Specifically designed for vegan athletes. Uses protein powders and seitan to hit high protein targets.",
        dietaryDetails: {
            include: ["Seitan", "Pea Protein", "Edamame", "Lentils", "Soy Milk"],
            avoid: ["Low protein junk food", "Animal products"],
            sampleMenu: {
                breakfast: "Protein oatmeal with soy milk and scoop of vegan protein",
                lunch: "Seitan stir-fry with broccoli",
                dinner: "Tofu steak with brown rice and beans",
                snack: "Roasted edamame"
            }
        }
    },

    // --- Loss Weight / Specific Goals ---
    {
        planName: "Low Calorie Slim Down",
        proteinLevel: "Low",
        dailyCalories: 1500,
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        description: "Calorie-restricted plan focused on nutrient density to support weight loss without starvation.",
        dietaryDetails: {
            include: ["Leafy Greens", "Lean Protein", "Berries", "Broth"],
            avoid: ["Sugary Drinks", "Fast Food", "High Calorie Sauces"],
            sampleMenu: {
                breakfast: "Egg white omelet with spinach",
                lunch: "Grilled chicken breast over mixed greens",
                dinner: "Soup with plenty of vegetables",
                snack: "Celery with salsa"
            }
        }
    },
    {
        planName: "Intermittent Fasting 16:8",
        proteinLevel: "Medium",
        dailyCalories: 1800,
        image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7",
        description: "Structured eating window. Meals are nutrient-dense to make the most of the 8-hour eating period.",
        dietaryDetails: {
            include: ["High Fiber Foods", "Protein", "Water (during fast)"],
            avoid: ["Eating outside the 8-hour window", "Binge eating"],
            sampleMenu: {
                breakfast: "(Skipped / Water / Black Coffee)",
                lunch: "12:00 PM - Large chicken salad with avocado",
                dinner: "7:00 PM - Salmon with roasted vegetables and wild rice",
                snack: "4:00 PM - Apple and almonds"
            }
        }
    },
    {
        planName: "Dash Diet for Health",
        proteinLevel: "Medium",
        dailyCalories: 2000,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
        description: "Dietary Approaches to Stop Hypertension. Low sodium, high potassium fruits and vegetables.",
        dietaryDetails: {
            include: ["Fruits", "Vegetables", "Low-fat Dairy", "Whole Grains"],
            avoid: ["Salt", "Red Meat", "Sweets", "Sugary Beverages"],
            sampleMenu: {
                breakfast: "Oatmeal with banana slices",
                lunch: "Tuna salad sandwich on whole wheat",
                dinner: "Roasted chicken breast with steamed broccoli",
                snack: "Low-fat yogurt"
            }
        }
    },
    {
        planName: "Gluten-Free Gut Health",
        proteinLevel: "Medium",
        dailyCalories: 1900,
        image: "https://images.unsplash.com/photo-1505253758473-96b701d8fe62",
        description: "Eliminates gluten to reduce bloating and inflammation. Rice, potatoes, and gluten-free oats.",
        dietaryDetails: {
            include: ["Rice", "Potatoes", "Quinoa", "Fruits", "Vegetables", "Meats"],
            avoid: ["Wheat", "Barley", "Rye", "Beer", "Bread (unless GF)"],
            sampleMenu: {
                breakfast: "Gluten-free toast with avocado",
                lunch: "Rice bowl with grilled veggies and chicken",
                dinner: "Baked potato topped with chili",
                snack: "Fruit smoothie"
            }
        }
    },
    {
        planName: "Sugar-Free Detox",
        proteinLevel: "Medium",
        dailyCalories: 1700,
        image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1",
        description: "Eliminates added sugars completely. Resets taste buds and stabilizes insulin levels.",
        dietaryDetails: {
            include: ["Whole Foods", "Meat", "Fish", "Grains", "Vegetables"],
            avoid: ["Candy", "Soda", "Desserts", "Hidden sugars in sauces"],
            sampleMenu: {
                breakfast: "Porridge (unsweetened) with cinnamon",
                lunch: "Turkey burger (no bun) with salad",
                dinner: "Stir-fry with soy sauce (sugar-free)",
                snack: "Carrot sticks with hummus"
            }
        }
    },
    {
        planName: "Senior Strong",
        proteinLevel: "Medium",
        dailyCalories: 1800,
        image: "https://images.unsplash.com/photo-1588612716155-22e4c41496b9",
        description: "Focuses on calcium, vitamin D, and easy-to-digest proteins for maintaining bone density and muscle in older age.",
        dietaryDetails: {
            include: ["Dairy", "Leafy Greens", "Salmon (canned with bones)", "Eggs", "Soft Fruits"],
            avoid: ["Raw tough vegetables", "Very spicy foods"],
            sampleMenu: {
                breakfast: "Soft scrambled eggs with spinach",
                lunch: "Soup with beans and soft vegetables",
                dinner: "Baked white fish with mashed sweet potato",
                snack: "Yogurt"
            }
        }
    },
    {
        planName: "Post-Workout Recovery",
        proteinLevel: "High",
        dailyCalories: 2600,
        image: "https://images.unsplash.com/photo-1627483262769-04d0a1401487",
        description: "High glycemic carbs and fast-digesting protein immediately after training to replenish glycogen stores.",
        dietaryDetails: {
            include: ["Whey Protein", "White Rice", "Potatoes", "Chicken Breast", "Gatorade"],
            avoid: ["High fat foods immediately post-workout"],
            sampleMenu: {
                breakfast: "Eggs and toast",
                lunch: "Chicken bowl with white rice",
                dinner: "Lean beef with baked potato",
                snack: "Post-workout: Protein shake + banana"
            }
        }
    }
];

const seedDiets = async () => {
    await connectDB();

    try {
        await Diets.deleteMany();
        console.log("Existing diet plans removed");

        await Diets.insertMany(dietPlans);
        console.log("Diet plans seeded successfully!");

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedDiets();
