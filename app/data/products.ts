export type Product = {
  id: string;
  name: string;
  code: string;
  currentBid: string;
  image: string;
  accent: string;
  description: string;
  details: string[];
  specs: Array<[string, string]>;
};

export const products: Product[] = [
  {
    id: "carbon-fiber-texturized-gaming-desk",
    name: "carbon fiber texturized gaming desk",
    code: "carbon-fiber-gaming-desk",
    currentBid: "0",
    image: "/products/carbon-fiber-texturized.jpg",
    accent: "#dc2626",
    description:
      "This carbon fiber texturized gaming desk features an ergonomic curved front cutout and a heavy-duty, T-shaped steel support frame. Engineered for high-performance setups, its scratch-resistant surface provides a smooth, optimized workspace for intense gaming sessions and multi-monitor configurations.",
    details: [
      "Ergonomic Curve: The contoured front design allows you to sit closer to the action, reducing forearm strain during long sessions.",
      'Carbon Fiber Finish: The texturized, wear-resistant desktop eliminates the strict need for an oversized mousepad while protecting against spills.',
      'Heavy-Duty T-Legs: The broad, solid steel base offers excellent stability and open legroom without blocking under-desk storage.',
    ],
      specs:[
      ["Lot", "1"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
  {
    id: "STORAGE-OTTOMAN",
    name: "COLLAPSIBLE STORAGE OTTOMAN",
    code: "STORAGE-OTTOMAN",
    currentBid: "0",
    image: "/products/STORAGE-OTTOMAN.jpg",
    accent: "#dc2626",
    description:
      "This item is a single, tiered tower storage ottoman upholstered in a textured white bouclé fabric. Its unique cylindrical, multi-level design allows it to serve as an eye-catching accent piece, a comfortable seat, and an elevated footrest.",
    details: [
      "Design Style: Features a structured, column-like look with distinct stacked tiers and a flat, padded top.",
      'Fabric Texture: Wrapped completely in a trendy, soft bouclé (teddy-fur) material that provides a cozy and modern feel.',
      'Storage Functionality: The top lid is removable, offering deep, concealed storage space inside for items like blankets or pillows.',
    ],
      specs:[
      ["Lot", "2"],
      ["Included", "Full set"],
      ["Price in origin country", "$20"],
    ],
  },
   {
    id: "VASAGLE-Table-basse",
    name: 'VASAGLE Table basse',
    code: "LCT205W46", 
    currentBid: "0",
    image: "/products/VASAGLE-Table.jpg",
    accent: "#dc2626",
    description:
      'This VASAGLE lift-top coffee table features a dual-level white wooden frame equipped with an integrated pop-up mechanical surface that extends upward and forward. The multi-functional design combines an adjustable elevated work desk with hidden lower storage compartments to maximize utility in compact living spaces.',
    details: [
      "Adjustable Lift Top: The split-panel top elevates smoothly from 48 cm to 62 cm to create a comfortable workspace or dining surface.",
      'Dual Storage Zones: Includes a large hidden compartment under the lift panel and three lower open cubbies for organizing books or decorative storage baskets.',
      'Stable Framework: Built with structural X-shaped side accent bars that reinforce stability and provide a subtle decorative detail.',
      'Standard Dimensions: Measures 100 cm long by 60 cm wide, offering a spacious footprint tailored for modern apartments or living rooms.',
    ],
      specs:[
      ["Lot", "3"],
      ["Included", "Full set"],
      ["Price in origin country", "€90"],
    ],
  },
   {
    id: "L-Shaped-Desk",
    name: 'L Shaped Desk',
    code: "B08R933CTJ", 
    currentBid: "0",
    image: "/products/L-Shaped-Desk.jpg",
    accent: "#dc2626",
    description:
      'This modern, space-saving L-shaped desk combines a crisp white scratch-resistant tabletop with a heavy-duty black metal frame to create an efficient corner workstation. Engineered specifically for compact environments, it maximizes your functional surface layout without crowding small rooms, bedrooms, or dedicated home offices.',
    details: [
      "Sturdy Construction: Crafted using thick, premium P2 particleboard paired with rigid steel support ribs and an integrated curved corner stability brace.",
      'Surface Resilience: The engineered white wood desktop is fully waterproof, anti-collision, and scratch-resistant to withstand the daily wear and tear of computing or writing.',
      'Enhanced Leveling & Floor Safety: Outfitted with adjustable, non-slip leg pads underneath the frame to ensure a flat working plane on uneven surfaces while actively preventing floor scratches.',
      'Spacious Ergonomic Footprint: Measures 119.9 x 119.9 x 73.9 cm (47.2" W x 15.7" D x 29.5" H), offering extensive underneath leg clearance alongside plenty of overhead room for dual monitors or gaming peripherals.',
    ],
      specs:[
      ["Lot", "4"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
   {
    id: "Smart-Cool-7000-3-1",
    name: 'Comfee Smart Cool 7000-3',
    code: "Comfee Smart Cool 7000-3", 
    currentBid: "0",
    image: "/products/comfee.webp",
    accent: "#dc2626",
    description:
      'The Comfee Smart Cool 7000-3 is a compact, 3-in-1 portable air conditioner that delivers efficient cooling, ventilation, and dehumidification for spaces up to 25 m². It features integrated Wi-Fi control, allowing you to effortlessly manage your indoor climate via a smartphone app or voice assistants like Alexa and Google Home.',
    details: [
      "Performance capacity: 7,000 BTU/h (2.0 kW) cooling power.",
      'Smart connectivity: App and voice control capabilities.',
      'Eco-friendly refrigerant: Uses natural R290 cooling agent.',
    ],
      specs:[
      ["Lot", "5"],
      ["Included", "Full set"],
      ["Price in origin country", "$170"],
    ],
  },
  {
    id: "Standing-Desk",
    name: 'COSTWAY Mobile Standing Desk',
    code: "B0CW2YTCTZ", 
    currentBid: "0",
    image: "/products/B0CW2YTCTZ.jpg",
    accent: "#dc2626",
    description:
      'This Costway Mobile Standing Desk is a pneumatic, height-adjustable rolling workstation designed to easily transition between sitting and standing setups. Its low-profile, space-saving H-shaped base allows it to slide conveniently under beds or sofas, making it an ideal option for compact home offices.',
    details: [
      "Pneumatic Height Lift: Adjusts smoothly from 74 cm to 108 cm using an easy-to-use lever system.",
      'Spacious Surface Area: Features a wide 95 x 52 cm tabletop that provides ample room for your laptop, notebook, and accessories.',
      'Lockable Wheels: Equipped with four universal rolling casters, including two locking brakes to secure the desk in place.',
      'Sturdy Design: Constructed with heavy-duty metal frames and high-quality boards for long-lasting stability and weight support.',
    ],
      specs:[
      ["Lot", "6"],
      ["Included", "Full set"],
      ["Price in origin country", "€90"],
    ],
  }, 
   {
    id: "Sun-Lounger",
    name: 'Sun Lounger',
    code: "B0CW97VLCJ", 
    currentBid: "0",
    image: "/products/Sun-Lounger.jpg",
    accent: "#dc2626",
    description:
      'This portable, three-fold beach sun lounger features an integrated overhead canopy to provide shade for your face while relaxing outdoors. Its lightweight, reclining design makes it a versatile choice for camping, patios, or poolside sunbathing.',
    details: [
      "Built-In Sunshade: Equipped with an adjustable overhead awning canopy to block direct sunlight.",
      'Multi-Position Recline: Features an adjustable backrest to easily switch between multiple sitting and laying angles.',
      'Durable Construction: Built with a sturdy steel frame and a breathable, fast-drying mesh fabric seat.',
      'Compact & Portable: Folds down into a flat, space-saving tri-fold configuration for easy transport and storage.',
    ],
      specs:[
      ["Lot", "7"],
      ["Included", "Full set"],
      ["Price in origin country", "$60"],
    ],
  },
   {
    id: "Cat-Litter-Storage",
    name: 'Cat Litter Storage',
    code: "9900349243", 
    currentBid: "0",
    image: "/products/Cat-Litter-Storage.jpg",
    accent: "#dc2626",
    description:
      'This multifunctional cabinet serves as a stylish living room coffee table while secretly housing a private, hidden cat litter box washroom. It features an integrated entrance vestibule and a removable scratching pad to catch stray litter tracks and protect your home furniture.',
    details: [
      "3-in-1 Design: Functions simultaneously as a hidden litter enclosure, a cat playroom, and a practical end table.",
      "Internal Divider: Features an inner winding entryway that satisfies your pet's curiosity while keeping larger dogs out.",
      "Litter-Control Scratcher: Includes a removable scratching pad near the exit to clean your cat's paws and minimize tracking.",
      'Heavy-Duty Tabletop: Supports a weight capacity of up to 87 kg, making it strong enough to hold books, decor, or a TV.',
    ],
      specs:[
      ["Lot", "8"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  }, 
    {
    id: "Bed-Barrier",
    name: 'Portable Baby Bed Barrier',
    code: "Bed-Barrier", 
    currentBid: "0",
    image: "/products/Bed-Barrier.jpg",
    accent: "#dc2626",
    description:
      'The NAIZY 150 cm Portable Baby Bed Rail Guard is a vertical-lifting safety barrier designed with a breathable mesh panel and a decorative bear design. It slides securely under a mattress to prevent young children from falling or rolling out of bed while they sleep.',
    details: [
      "Adjustable Height: Offers 28 adjustable height positions ranging from 70 to 93 cm to match your mattress thickness.",
      "Child Safety Lock: Features a dual-action safety mechanism requiring you to twist and then press to prevent accidental drops by children.",
      "Storage Pocket: Built with a central 30 x 24 cm storage pouch for quick access to baby supplies like diapers or toys.",
      'Seamless 90° Fit: Presses flush against the mattress edge to eliminate dangerous gaps where a child could get trapped.',
    ],
      specs:[
      ["Lot", "9"],
      ["Included", "Full set"],
      ["Price in origin country", "€35"],
    ],
  }, 
   {
    id: "Gigaset",
    name: 'Gigaset Pure 100 A Trio',
    code: "Pure-100-A-Trio", 
    currentBid: "0",
    image: "/products/Gigaset.jpg",
    accent: "#dc2626",
    description:
      'The Gigaset Pure 100A Trio is a reliable cordless home phone system that features three separate handsets and an integrated digital answering machine. Designed to reduce unwanted interruptions, it includes a dedicated, one-touch call-blocking button to easily restrict nuisance callers.',
    details: [
      "Multi-Room Setup: Includes three cordless handsets and charging cradles to provide phone access across multiple rooms from a single phone line.",
      'Call Management: Equipped with a dedicated call-block key to quickly filter out and silence up to 25 unwanted phone numbers.',
      'Built-in Voicemail: Features an integrated digital answering machine on the main base station to record missed messages.',
      'Clear Display: Outfitted with an illuminated 1.5-inch monochrome screen for easy viewing of caller ID, menus, and battery status.',
    ],
      specs:[
      ["Lot", "10"],
      ["Included", "Full set"],
      ["Price in origin country", "$65"],
    ],
  },
   {
    id: "Vasagle-Bedside-Table",
    name: "Vasagle Bedside Table",
    code: "Vasagle-Bedside-Table", 
    currentBid: "0",
    image: "/products/Vasagle-Bedside-Table.jpg",
    accent: "#dc2626",
    description:
      'The VASAGLE Miranta Bedside Table (Model LET655W01) is a compact, minimalist nightstand featuring a clean snow-white finish and elegant slanted solid wood legs. It blends timeless style with practical storage, making it an ideal companion for bedrooms or living rooms.',
    details: [
      'Compact Dimensions: Measures 28 x 39 x 55 cm, making it perfect for tight spaces.',
      "Tiered Storage: Features a spacious tabletop, a smooth-sliding drawer, and an open lower shelf.",
      "Sturdy Build: Crafted from durable engineered wood and solid legs, supporting up to 45.4 kg on top.",
      'Versatile Use: Functions beautifully as a bedroom nightstand, a living room end table, or a cozy hallway accent.',
    ],
      specs:[
      ["Lot", "11"],
      ["Included", "Full set"],
      ["Price in origin country", "$60"],
    ],
  },
  {
    id: "Laundry-Basket",
    name: 'Laundry Basket',
    code: "Laundry-Basket", 
    currentBid: "0",
    image: "/products/Laundry-Basket.jpg",
    accent: "#dc2626",
    description:
      'This minimalist laundry organizer blends organic style with functional utility, featuring a sleek, sustainably sourced natural bamboo wood frame that extends upwards into dual side carrying handles. A deep, sand-colored fabric storage liner hangs suspended below a structured hard lid, providing an elegant and clean way to keep laundry out of sight while maintaining an organized, contemporary look in any room',
    details: [
      'Eco-Friendly Framework: Built from high-quality, FSC 100% certified bamboo which is naturally moisture-resistant and durable—making it perfectly safe for high-humidity bathroom spaces.',
      "Functional Lift Lid: Features a lightweight, solid lid wrapped in matching canvas fabric that securely closes to hide laundry from sight and preserve room aesthetics.",
      "Removable Liner Bag: The heavy-duty canvas fabric liner easily slips off or out of the main wooden track, simplifying transit straight to the washing machine.",
      'Portability Design: Outfitted with an extended wood design that acts as integrated top handles, ensuring an easy grip if you need to slide or lift the whole hamper across the floor.',
    ],
      specs:[
      ["Lot", "12"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  },
   {
    id: "plastic-shoe-cabinet",
    name: "Plastic Shoe Cabinet",
    code: "plastic-shoe-cabinet", 
    currentBid: "0",
    image: "/products/plastic-shoe-cabinet-1.jpg",
    accent: "#dc2626",
    description:
      'This modular DIY shoe rack uses interlocking plastic panels and round connectors to build customizable, space-saving storage cubbies. Its lightweight design includes translucent flip-open doors to keep your footwear dust-free while allowing you to easily view the contents inside.',
    details: [
      'Customizable Layout: The interlocking design lets you configure the height and width to fit into entryways, closets, or tight spaces.',
      "Dust Protection: Front doors snap shut to keep shoes clean, organized, and out of sight.",
      "Ventilation: Integrated finger-pull holes on the doors ensure steady airflow to prevent odors.",
    ],
      specs:[
      ["Lot", "13"],
      ["Included", "Full set"],
      ["Price in origin country", "$60"],
    ],
  },
  {
    id: "Mannequin",
    name: "Mannequin",
    code: "B0DBKLFY43", 
    currentBid: "0",
    image: "/products/Mannequin.jpg",
    accent: "#dc2626",
    description:
      'This lightweight female dress form mannequin features a pinnable foam body designed for fashion students, designers, and boutiques to display clothing or practice draping. It comes equipped with a matching, adjustable tripod stand that allows you to customize the height for storefront windows or countertop setups.',
    details: [
      'Material: Pinnable foam body with a clean fabric cover and a durable plastic tripod base.',
      'Dimensions: 32" chest, 15" shoulders, 25" waist, and 34" hips.',
      "Adjustable Height: Easily adjusts up to a maximum height of 160 cm.",
    ],
      specs:[
      ["Lot", "14"],
      ["Included", "Full set"],
      ["Price in origin country", "€70"],
    ],
  },
  {
    id: "popcorn-machine",
    name: 'Popcorn Machine 300W',
    code: "00063873", 
    currentBid: "0",
    image: "/products/pcm300.webp",
    accent: "#dc2626",
    description:
      'The Stagecaptain PCM-300 is a compact 300-watt tabletop popcorn maker that brings an authentic 1950s retro cinema aesthetic straight to your countertop. Utilizing a traditional stainless steel rotating kettle, it quickly whips up theater-style popcorn with oil and seasoning for the ultimate movie night experience.',
    details: [
      "Classic Kettle Design: Suspended stainless steel pot heats and rotates automatically to prevent burning.",
      'Warm Interior Light: Built-in internal lamp illuminates the popping process and keeps snacks under a warm spotlight.',
      'Easy to Clean: Features a removable kettle and catch tray that unhook completely for quick hand-washing.',
    ],
      specs:[
      ["Lot", "15"],
      ["Included", "Full set"],
      ["Price in origin country", "€80"],
    ],
  },
   {
    id: "Console-Table",
    name: 'VASAGLE Console Table',
    code: "B0CR3NW8J2", 
    currentBid: "0",
    image: "/products/Console-Table.jpg",
    accent: "#dc2626",
    description:
      'This space-saving console table features an ultra-slim 20 cm depth designed to fit comfortably into tight hallways, entryways, or directly behind a couch. Its minimalist design pairs charcoal grey engineered wood panels with a clean, matte black steel framework to effortlessly blend into modern home decors.',
    details: [
      'Dimensions: 100 cm Width x 20 cm Depth x 80 cm Height (39.4" x 7.9" x 31.5")',
      "Materials: High-quality particleboard tabletop and shelving supported by a durable steel metal frame",
      "Stability Features: Equipped with adjustable leveling feet to keep the unit steady on uneven floors and protect surfaces from scratches",
      'Multi-Purpose Use: Functions efficiently as an entry table for keys and mail, a display stage for plants and decor, or a slim sofa-side storage unit',
    ],
      specs:[
      ["Lot", "16"],
      ["Included", "Full set"],
      ["Price in origin country", "€35"],
    ],
  }, 
   {
    id: "childrens-storage-organizer",
    name: "children's storage organizer",
    code: "storage-organizer", 
    currentBid: "0",
    image: "/products/childrens-storage-organizer.jpg",
    accent: "#dc2626",
    description:
      'This is a low-profile, kid-friendly toy organizer unit featuring a sturdy white wooden frame paired with versatile storage options. The top level consists of an open display shelf ideal for books or display toys, while the bottom shelf neatly houses three removable, collapsible fabric bins to conceal smaller play items',
    details: [
      'Frame Material: Constructed from durable engineered wood (MDF) with a clean white matte finish.',
      "Storage Components: Features 1 upper wide display shelf and 3 square, non-woven fabric storage drawers equipped with front handle cutouts for easy pulling.",
      "Child-Centric Design: Designed at a low height so infants and toddlers can safely access and put away their toys independently.",
      'Versatile Functionality: Functions dynamically as a hybrid book bookshelf, storage cabinet, and organizer for playrooms, nurseries, or bedrooms.',
    ],
      specs:[
      ["Lot", "17"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  }, 
  {
    id: "Camping-Table",
    name: "Camping Table",
    code: "B0BZVHYV1G", 
    currentBid: "0",
    image: "/products/Camping-Table.jpg",
    accent: "#dc2626",
    description:
      'This portable square folding dining table features a rich wood-grain finish tabletop supported by a heavy-duty, black metal X-shaped scissor frame. Designed for compact living, patios, or study areas, its space-saving cross-base allows it to quickly collapse completely flat for convenient storage.',
    details: [
      'Space-Saving Design: Folds entirely flat in seconds, making it ideal for tight apartments, small balconies, or quick transport.',
      "No Assembly Required: Shipped fully assembled and ready to use straight out of the box.",
      "Robust Stability: Engineered with a heavy-duty metal X-frame structure to maximize weight bearing and prevent wobbling.",
    ],
      specs:[
      ["Lot", "18"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  }, 
    {
    id: "LED-Curve",
    name: "LED Floor Lamp",
    code: "LED-Curve", 
    currentBid: "0",
    image: "/products/LED-Curve.jpg",
    accent: "#dc2626",
    description:
      'The Livarno Home LED Curved Floor Lamp is a sleek, minimalist fixture featuring an elegant, curved design made from premium brushed aluminum. It delivers efficient, warm white lighting while serving as a contemporary visual accent in modern living spaces.',
    details: [
      'Illumination: Provides an integrated 11-watt LED module that emits a soft, inviting warm white light (approximately 3,000 Kelvin).',
      "Brightness Control: Features a built-in foot switch with an integrated stepless touch-dimmer to easily adjust light intensity.",
      "Energy Savings: Offers high energy efficiency with a light output of up to 1,200 lumens while consuming minimal power.",
    ],
      specs:[
      ["Lot", "19"],
      ["Included", "Full set"],
      ["Price in origin country", "€25"],
    ],
  },
  {
    id: "vacuum-cleaner",
    name: "Beldray Airapid Flex & Pet cordless stick vacuum cleaner",
    code: "vacuum-cleaner", 
    currentBid: "0",
    image: "/products/vacuum-cleaner-pet.jpg",
    accent: "#dc2626",
    description:
      'This lightweight, versatile cordless stick vacuum cleaner is specifically designed to tackle stubborn pet hair, fur, and embedded dust across multiple floor types and upholstery. Its unique folding joint extension wand allows you to easily glide flat under low furniture without bending down',
    details: [
      'Battery Power: 22.2V lithium-ion rechargeable battery.',
      "Maximum Runtime: Up to 35 minutes of continuous operation per charge.",
      "Dust Capacity: 500 ml easy-to-empty dust container.",
    ],
      specs:[
      ["Lot", "20"],
      ["Included", "Full set"],
      ["Price in origin country", "€70"],
    ],
  }, 
   {
    id: "Feandrea-Cat-Tree-Tower",
    name: "Feandrea Cat Tree Tower",
    code: "Feandrea-Cat-Tree-Tower", 
    currentBid: "0",
    image: "/products/Feandrea-Cat-Tree-Tower.jpg",
    accent: "#dc2626",
    description:
      'This shipping box contains a multi-level Feandrea Cat Tree designed specifically to accommodate larger or chubby cats. It features a robust design that balances rest and play areas into a compact footprint.',
    details: [
      'Resting Zones: Features a large top viewing perch, a double-door cat condo, and a side hammock.',
      'Activity Elements: Includes full sisal-wrapped scratching posts, a hanging plush pompom, and an angled ramp ladder.',
      'Weight Limits: Best suited for cats weighing up to 7 kg each.',
    ],
      specs:[
      ["Lot", "21"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  }, 
   {
    id: "Study-Table",
    name: "Study Table for Students & Office",
    code: "Study-Table", 
    currentBid: "0",
    image: "/products/Study-Table.jpg",
    accent: "#dc2626",
    description:
      'This compact white engineered wood study desk by Alpine Willow features built-in dual open shelves for efficient, space-saving storage. It is designed as a functional writing and computer workstation, making it an ideal choice for student bedrooms, dorms, or small home offices',
    details: [
      'Material: Laminated engineered wood (17 mm tabletop thickness)',
      "Storage: 2 side-facing open storage compartments",
      'Assembly: Multi-piece furniture item requiring self-assembly (hardware included)',
    ],
      specs:[
      ["Lot", "22"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  }, 
  {
    id: "Crivit-Cooler",
    name: 'Crivit Cooler',
    code: "CEK 29", 
    currentBid: "0",
    image: "/products/Crivit-Cooler.jpg",
    accent: "#dc2626",
    description:
      "The Crivit Electric Cool Box is a budget-friendly, portable thermoelectric travel refrigerator sold seasonally through Lidl supermarkets. It is designed to switch seamlessly between a vehicle's 12V cigarette lighter and a standard 230V wall outlet, making it perfect for camping and road trips.",
    details: [
      "Capacity: Offers a generous 29-to-30-liter interior that can easily hold six upright 1.5L or 2L bottles.",
      "Dual Cooling & Heating: Cools food and drinks down to 20°C below ambient room temperature and heats up to 65°C",
      'Power & Performance: Features built-in connection cables, a rubber lid seal to reduce condensation, and an Eco-mode for ultra-quiet operation.',
      'Portability: Built with a durable outer shell and a locking carry handle that holds the lid securely closed while you are moving.',
    ],
      specs:[
      ["Lot", "23"],
      ["Included", "Full set"],
      ["Price in origin country", "€60"],
    ],
  },
   {
    id: "Medical-Stand",
    name: "Medical Stand Alone Toilet Safety Frame",
    code: "Medical-Stand",
    currentBid: "0",
    image: "/products/Medical-Stand.jpg",
    accent: "#dc2626",
    description:
      "This freestanding toilet safety frame provides stable armrest support to help seniors or individuals with limited mobility sit down and stand up safely. It is designed to fit around standard toilets or chairs without requiring permanent wall or floor installation.",
    details: [
      "Tool-free assembly: The pieces snap together quickly using secure push-button locking pins.",
      'Adjustable height: The vertical legs can be raised or lowered to customize the armrest height for different users.',
      'Padded armrests: The durable foam handles offer a comfortable, slip-resistant grip when applying weight.',
    ],
      specs:[
      ["Lot", "24"],
      ["Included", "Full set"],
      ["Price in origin country", "$80"],
    ],
  },
  {
    id: "Tornado-32",
    name: 'Tornado 32" TV',
    code: "Tornado-32", 
    currentBid: "0",
    image: "/products/Tornado-32.jpg",
    accent: "#dc2626",
    description:
      'This Tornado 32" TV features a sleek, edge-to-edge frameless screen designed to maximize the display area for a modern aesthetic. It pairs essential internet streaming platforms with vibrant high-definition picture quality, making it a perfect fit for smaller rooms',
    details: [
      "Display Panel: 32-inch High-Definition LED screen with a 1366 x 768 resolution and an expansive 178° viewing angle",
      'Frameless Design: Ultra-slim bezels on three sides to blend seamlessly into contemporary home decor.',
      'Smart Platforms: Powered by Google TV, Android, or WebOS (model dependent) providing seamless access to Netflix, YouTube, and Prime Video.',
    ],
      specs:[
      ["Lot", "25"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
  {
    id: "Shoe-Rack-livarno",
    name: "Shoe Rack Livarno",
    code: "Shoe-Rack", 
    currentBid: "0",
    image: "/products/Shoe-Rack-livarno.jpg",
    accent: "#dc2626",
    description:
      'This item is a Livarno Home Metal Shoe Rack designed for compact and organized footwear storage. It combines standard shelving with top-mounted specialized holders to maximize entryway or closet space.',
    details: [
      'Dual-Function Design: Features 4 horizontal wire mesh shelves for normal footwear and 12 loop-shaped, padded hooks at the top specifically built to hold boots or shoes upright.',
      'Storage Capacity: Accommodates up to 18 pairs of shoes across its tier system and hanger extensions.',
      "Sturdy Construction: Formed from durable black metal capable of handling a total weight capacity of up to 40 kg.",
    ],
      specs:[
      ["Lot", "26"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  }, 
   {
    id: "Dining-Chair",
    name: "SONGMICS Dining Chair",
    code: "Dining-Chair", 
    currentBid: "0",
    image: "/products/Dining-Chair.jpg",
    accent: "#dc2626",
    description:
      'This elegant SONGMICS velvet dining chair combines a vertically tufted grey fabric shell with minimalist black metal legs for a modern look. Its contoured backrest and integrated armrests provide ergonomic support, making it a comfortable addition to any dining room, vanity, or home office.',
    details: [
      'Enhanced Comfort: Features a 7 cm thick foam-padded cushion and an ultra-soft velvet upholstery.',
      'Sturdy Base: Supported by splayed black metal legs with a weight capacity of 110 kg.',
      "Floor Protection: Includes adjustable leveling feet to prevent wobbling and eliminate floor scratches.",
    ],
      specs:[
      ["Lot", "27"],
      ["Included", "Full set"],
      ["Price in origin country", "€50"],
    ],
  }, 
   {
    id: "VASAGLE-Small-Side-Table",
    name: "VASAGLE Small Side Table",
    code: "VASAGLE-Small-Side-Table", 
    currentBid: "0",
    image: "/products/VASAGLE-Small-Side-Table.jpg",
    accent: "#dc2626",
    description:
      'The VASAGLE LET223R61 is a compact, round side table from the LILEA collection featuring a sleek pastel pink tabletop and cloud white frame. It seamlessly blends modern functionality with style by integrating a double-layer beige fabric storage basket directly underneath the top.',
    details: [
      'Space-saving size: Measures 45 x 50 cm (17.7" x 19.7"), making it ideal for tight spaces next to beds, sofas, or armchairs.',
      "Sturdy build: Engineered with high-quality particleboard and a solid steel alloy frame that safely supports up to 35 kg (77 lbs).",
      'Versatile storage: Equipped with a spacious, chemical-free polyester fabric basket perfect for organizing blankets, books, toys, or pet supplies.',
    ],
      specs:[
      ["Lot", "28"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  }, 
  {
    id: "Medicine-Cabinet",
    name: "Double-door Metal Medicine Cabinet",
    code: "Medicine-Cabinet", 
    currentBid: "0",
    image: "/products/Medicine-Cabinet.jpg",
    accent: "#dc2626",
    description:
      'This wall-mounted utility cabinet features a dual-layer storage layout with integrated shelving built directly into the swinging door panel. Its powder-coated white finish provides a clean, professional aesthetic ideal for medical supplies, clinical storage, or bathroom organization',
    details: [
      'Space-Saving Design: Utilizes a shallow profile with clever multi-tier inner door compartments to maximize vertical storage space without sticking out too far from the wall.',
      "Durable Construction: Made from rigid sheet metal with a smooth, wipeable gloss finish designed to resist moisture and heavy everyday use.",
      'Organized Layout: Combines deep interior fixed shelves for larger bottles alongside smaller guardrails on the door to keep tiny items securely in place.',
    ],
      specs:[
      ["Lot", "29"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  },
  {
    id: "projector",
    name: "Magcubic HY300Pro",
    code: "HY300Pro",
    currentBid: "0",
    image: "/products/Magcubic-HY300Pro.webp",
    accent: "#dc2626",
    description:
      "The Magcubic HY300Pro is an ultra-affordable, full HD portable smart projector featuring a 180-degree rotating stand that easily projects onto walls or ceilings. Running on a built-in Android operating system, it provides instant access to your favorite streaming apps without needing extra hardware.",
    details: [
      "Resolution: Native 1080p Full HD resolution with support for 4K video decoding.",
      'Brightness: 390 to 500 ANSI lumens, offering great clarity in dark or dim rooms.',
      'Throw Ratio: Short 0.9:1 throw ratio that projects a massive 100-inch screen from just 2 meters away.',
    ],
      specs:[
      ["Lot", "30"],
      ["Included", "Full set"],
      ["Price in origin country", "100$"],
    ],
  },
   {
    id: "shoe-rack",
    name: 'Multi-tier vertical shoe rack',
    code: "shoe-rack", 
    currentBid: "0",
    image: "/products/shoe-rack.jpg",
    accent: "#dc2626",
    description:
      'This 10-tier portable shoe rack features a lightweight frame covered by a protective, dustproof fabric shell to keep your footwear collection clean and organized. Its space-saving, vertical design makes it an ideal storage solution for compact entryways, walk-in closets, or bedrooms.',
    details: [
      'Capacity: Accommodates 27 to 30 pairs of adult shoes across 10 spacious tiers.',
      "Material: Constructed with durable steel pipes, heavy-duty plastic connectors, and water-resistant non-woven fabric shelves.",
      "Dustproof Cover: Equipped with a zippered, roll-up front door that protects shoes from dust, moisture, and pests while keeping them hidden.",
      'Customizable Layout: Removable tiers allow you to adjust the shelf height to fit taller items like winter boots or high heels.',
    ],
      specs:[
      ["Lot", "31"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },
   {
    id: "Nightstand",
    name: "VASAGLE LED Nightstand",
    code: "B0CQKWNQRH", 
    currentBid: "0",
    image: "/products/Nightstand.jpg",
    accent: "#dc2626",
    description:
      'This minimalist, handleless black 3-drawer nightstand features a sleek matte finish with integrated visual recesses to pull open the drawers. Its clean, geometric silhouette blends seamlessly into modern, contemporary, or industrial bedroom décors.',
    details: [
      'Modern Aesthetic: The flush, handle-free front panels eliminate hardware clutter for a smooth, ultra-clean contemporary look.',
      "Versatile Functionality: Designed primarily as a bedroom nightstand, its neutral profile allows it to double as an office filing chest or a living room side table.",
      "Space-Saving Storage: Three deep, stacked drawers maximize vertical storage capacity while maintaining a compact footprint next to the bed.",
    ],
      specs:[
      ["Lot", "32"],
      ["Included", "Full set"],
      ["Price in origin country", "$70"],
    ],
  },
   {
    id: "LED-Floor-Lamp",
    name: "LED Floor Torchiere Lamp",
    code: "Torchiere-Lamp", 
    currentBid: "0",
    image: "/products/lamp.jpg",
    accent: "#dc2626",
    description:
      'The Livarno Home LED Floor Torchiere Lamp is a sleek, dual-source freestanding light featuring a brushed-metal finish and an energy-efficient integrated design. It combines a powerful, glare-free upper bowl uplighter for ambient room lighting with a flexible, adjustable lower spotlight tailored for reading or task-oriented work.',
    details: [
      'Dual Light Sources: Includes a large main uplighter and a separate, fully adjustable reading lamp on a flexible gooseneck arm.',
      "Modern Aesthetic: Features a premium brushed aluminum/nickel finish with a solid, weighted circular base to ensure stability.",
      "Independent Controls: Built with separate power switches so you can operate the ambient bowl and the reading light individually.",
    ],
      specs:[
      ["Lot", "33"],
      ["Included", "Full set"],
      ["Price in origin country", "€50"],
    ],
  }, 
  {
    id: "High-Back",
    name: "High-Back Folding Seat",
    code: "High-Back", 
    currentBid: "0",
    image: "/products/High-Back.jpg",
    accent: "#dc2626",
    description:
      'This Costway High Back Folding Boat Seat features a durable, waterproof marine-grade vinyl finish with an ergonomic sponge cushion for premium comfort.',
    details: [
      'Marine-Grade Build: Covered in waterproof, UV-treated PVC leather to withstand sun exposure and heavy rain.',
      "Ergonomic Cushioning: Thick, high-density sponge padding provides comfortable back and lumbar support for long hours of fishing.",
      "Fold-Down Design: Equipped with heavy-duty aluminum hinges that fold flat, alongside a built-in tie-down strap to keep the seat secured while traveling at high speeds.",
    ],
      specs:[
      ["Lot", "34"],
      ["Included", "Full set"],
      ["Price in origin country", "$45"],
    ],
  }, 
   {
    id: "Ultenic",
    name: 'Ultenic D6S Robot Vacuum Cleaner ',
    code: "Ultenic-D6S", 
    currentBid: "0",
    image: "/products/ultenic.jpg",
    accent: "#dc2626",
    description:
      'The Ultenic D6s is an ultra-slim 3-in-1 automated household cleaning appliance that sweeps, vacuums, and washes hard floors simultaneously. Equipped with smart gyroscopic navigation and intelligent mobile application controls, it maps efficient cleaning paths while effortlessly gliding beneath low furniture to tackle tough messes like dirt, stains, and pet hair.',
    details: [
      "Sonic Mopping Technology: Scrubs hard surfaces up to 3,000 vibrations per minute, allowing it to deep clean stubborn spots like muddy footprints and coffee stains.",
      '3000Pa Strong Suction: Easily draws up heavy debris, fine dust, and deeply embedded hair from both hard floors and carpets.',
      'Automatic Carpet Boost: Intelligently detects carpeted areas to automatically crank suction power to its absolute maximum capacity for deep fiber cleaning.',
      'Ultra-Thin 7.4 cm Build: Features an exceptionally low-profile design combined with infrared anti-drop sensors to seamlessly clean tight spaces without getting stuck or falling down stairs.',
    ],
      specs:[
      ["Lot", "35"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
  {
    id: "cat-tree-tower",
    name: 'Cat Tree Tower',
    code: "cat-tree-tower", 
    currentBid: "0",
    image: "/products/cat-tree-tower.jpg",
    accent: "#dc2626",
    description:
      'This multi-level cream-colored cat tree tower is an all-in-one activity and relaxation center designed for multi-cat households. It offers an expansive vertical layout that allows multiple cats to climb, play, and rest simultaneously while complementing your home decor.',
    details: [
      "Multi-Tier Layout: Features an expansive design with up to eight functional levels, allowing multiple cats to explore at different heights.",
      "Dual Condos & Perches: Outfitted with two built-in enclosed cozy cat houses for privacy, alongside three plush top-tier platforms that act as elevated lookout perches.",
      "Dedicated Lounging Zones: Includes a central suspended hammock sling and a lower dangling cat basket bed to provide versatile cozy resting spots.",
      'Interactive Elements: Equipped with dynamic hanging plush toy pompoms, an angled textured climbing ramp, and multiple sisal-wrapped structural pillars for healthy claw maintenance.',
    ],
      specs:[
      ["Lot", "36"],
      ["Included", "Full set"],
      ["Price in origin country", "$90"],
    ],
  }, 
  {
    id: "kids-bookshelf",
    name: "Kids Bookshelf",
    code: "kids-bookshelf", 
    currentBid: "0",
    image: "/products/kids-bookshelf.jpg",
    accent: "#dc2626",
    description:
      'This Montessori-style bookshelf features four deep, cascading tiers designed to store books front-facing so children can easily recognize their favorite covers. Crafted with a warm, natural wood-grain finish, its low-profile structure allows toddlers and young kids to independently reach and organize their own reading materials.',
    details: [
      'Front-Facing Design: Showcases book covers rather than spines to naturally encourage reading and discovery in early development.',
      "Child-Friendly Height: Perfectly scaled low to the ground, enabling infants and toddlers to safely pick up or put away books without adult help.",
      "Deep Storage Slots: Features tiered compartments that securely hold multiple books or magazines per row without them flipping forward.",
    ],
      specs:[
      ["Lot", "37"],
      ["Included", "Full set"],
      ["Price in origin country", "$35"],
    ],
  },
   {
    id: "Fascial-Gun",
    name: "Fascial Gun",
    code: "Fascial-Gun", 
    currentBid: "0",
    image: "/products/fascial-gun.jpg",
    accent: "#dc2626",
    description:
      'The Fascial Gun GB-820 is a cordless percussion massage gun designed to relieve muscle stiffness and soreness after workouts. It uses deep tissue vibration technology to stimulate blood circulation and accelerate muscle recovery.',
    details: [
      '6-Speed Adjustment: Features multiple variable frequency levels to easily control the intensity of your massage.',
      "Targeted Recovery: Helps relax tight muscles, break down lactic acid, and improve overall range of motion.",
      "Cordless & Portable: Powered by a built-in rechargeable battery for convenient, on-the-go use without tangled cords.",
    ],
      specs:[
      ["Lot", "38"],
      ["Included", "Full set"],
      ["Price in origin country", "$35"],
    ],
  },
    {
    id: "Rollator",
    name: "Arebos Lightweight Rollator",
    code: "Rollator", 
    currentBid: "0",
    image: "/products/Rollator.jpg",
    accent: "#dc2626",
    description:
      'The item corresponding to that specific product ID is the Arebos Lightweight Aluminium Rollator Walker. It is a highly-rated mobility aid designed for both indoor and outdoor use.',
    details: [
      'Customizable Design: Features a 6-way height-adjustable handle (ranging from 78 cm to 91 cm) to accommodate different body sizes and encourage correct posture.',
      "Weight & Capacity: Built with a sturdy yet lightweight aluminum frame weighing 7.1 kg, supporting a maximum user weight capacity of up to 135 kg (approx. 300 lbs).",
      "Safety & Mobility: Equipped with ergonomic handles featuring a 2-in-1 braking system (hand brake for control and parking brake for stable sitting), alongside 360° swivel wheels, a practical curb climber aid, and integrated safety reflectors.",
    ],
      specs:[
      ["Lot", "39"],
      ["Included", "Full set"],
      ["Price in origin country", "€75"],
    ],
  },
  {
    id: "patio",
    name: "Outdoor Market Patio Umbrella",
    code: "patio", 
    currentBid: "0",
    image: "/products/patio.jpg",
    accent: "#dc2626",
    description:
      'A freestanding vibrant yellow outdoor market patio umbrella featuring a protective edge valance, designed to offer reliable sun shading for residential backyards, patios, or commercial cafe layouts.',
    details: [
      'Sturdy Frame Support: Built with a rigid metal center pole connected to a multi-rib under-canopy skeleton for optimal wind stability.',
      'Weather-Resistant Fabric: Outfitted with a durable, water-repellent polyester canvas canopy that provides UV protection.',
      'Freestanding Cross Base: Includes a low-profile metal cross-base setup, suitable to slot into dining tables or stand alone when reinforced with external anchor weights.',
    ],
      specs:[
      ["Lot", "40"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  },
  {
    id: "rectangular-wall-mirror",
    name: "rectangular wall mirror",
    code: "rectangular-wall-mirror", 
    currentBid: "0",
    image: "/products/rectangular-wall-mirror.jpg",
    accent: "#dc2626",
    description:
      'This modern, frameless rectangular wall mirror is equipped with an integrated rear LED lighting setup designed to cast a soft ambient glow. It features a distinct wide, translucent frosted glass border that beautifully diffuses the backlighting while maintaining a clean, minimalist silhouette',
    details: [
      'Ambient Backlighting: Projects a smooth halo of light against the wall, reducing harsh shadows during grooming or repairs.',
      'Frosted Edge Diffusion: The wide frosted glass perimeter acts as a built-in light diffuser for a modern, sleek aesthetic.',
      "Versatile Wall Mounting: Clean frameless design that can seamlessly blend into retail shops, styling stations, workshops, or bathrooms.",
    ],
      specs:[
      ["Lot", "41"],
      ["Included", "Full set"],
      ["Price in origin country", "$80"],
    ],
  },
   {
    id: "Tree-Care-Saw",
    name: "Parkside Petrol Tree Care Saw",
    code: "Tree-Care-Saw", 
    currentBid: "0",
    image: "/products/Tree-Care-Saw.jpg",
    accent: "#dc2626",
    description:
      'This is a compact Parkside 2-stroke petrol chainsaw specifically designed for precision pruning and tree care. It features a lightweight, maneuverable design paired with an efficient engine to handle demanding outdoor cutting tasks.',
    details: [
      'Power Output: 0.7 kW (0.95 HP) generated by a 25.4 cm³ engine.',
      'Cutting Performance: Features a 20 cm cutting length with a maximum chain speed of 21 m/s.',
      'Engine Speed: Reaches up to 11,000 rpm with the guide and chain attached.',
    ],
      specs:[
      ["Lot", "42"],
      ["Included", "Full set"],
      ["Price in origin country", "€65"],
    ],
  }, 
  {
    id: "Crepe-Maker",
    name: "Crêpe Maker",
    code: "Crepe-Maker", 
    currentBid: "0",
    image: "/products/Crepe-Maker.jpg",
    accent: "#dc2626",
    description:
      'The SilverCrest 1500W Crêpe Maker is an electric countertop appliance designed to bake large, thin crêpes and pancakes quickly and evenly. It features a continuously adjustable thermostat and a high-quality non-stick plate to ensure smooth batter spreading and easy food release.',
    details: [
      'Power Capacity: Features a robust 1500W heating element for rapid heat-up.',
      'Large Cooking Area: Equipped with a 34 cm diameter plate suitable for traditional, large-sized crêpes.',
      'Non-Stick Coating: Uses a premium ILAG® non-stick layer to prevent sticking without excess oil.',
    ],
      specs:[
      ["Lot", "43"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },
   {
    id: "SilverCrest-2-in-1",
    name: "SilverCrest 2-in-1 Arm and Leg Exerciser",
    code: "100397848", 
    currentBid: "0",
    image: "/products/SilverCrest-2-in-1.jpg",
    accent: "#dc2626",
    description:
      "This SilverCrest mini pedal exerciser is a compact 2-in-1 fitness device designed for targeted muscle training. It can be placed on the floor to exercise your legs or on a table to strengthen your arms.",
    details: [
      'Dual-Action Workouts: Targets both leg and arm muscles depending on placement.',
      "Digital Display: Tracks training time, speed, distance, and estimated calorie burn.",
      'Adjustable Tension: Features a continuous resistance knob to customize workout intensity.',
    ],
      specs:[
      ["Lot", "44"],
      ["Included", "Full set"],
      ["Price in origin country", "€35"],
    ],
  },
  {
    id: "Automatic-Tape",
    name: "PARKSIDE 4V Automatic Tape Measure",
    code: "Automatic-Tape", 
    currentBid: "0",
    image: "/products/Automatic-Tape.jpg",
    accent: "#dc2626",
    description:
      'The PARKSIDE 4V Automatic Tape Measure (PDMB A1) is a cordless, digital measuring tool that combines a traditional physical tape with an electronic readout. It features a built-in laser marker and a clear digital screen to deliver fast, highly accurate calculations for DIY and renovation projects.',
    details: [
      'Dual Reading: Displays measurements on both the traditional physical blade and an automatic digital LED screen.',
      'Integrated Laser: Emits a precise laser line to easily project reference marks and keep alignments straight.',
      "Smart Calculations: Features dedicated buttons to instantly find the absolute center point or divide lengths into sub-sections.",
    ],
      specs:[
      ["Lot", "45"],
      ["Included", "Full set"],
      ["Price in origin country", "€20"],
    ],
  },
   {
    id: "Laundry-Basket-2",
    name: "Laundry Basket",
    code: "Laundry-Basket", 
    currentBid: "0",
    image: "/products/Laundry-Basket-1.jpg",
    accent: "#dc2626",
    description:
      'This 100L foldable laundry basket combines a sleek black fabric body with a natural bamboo rim to keep dirty clothes organized and neatly out of sight. It features a practical lid to contain odors and a removable, machine-washable inner bag that makes transporting clothes to the washing machine effortless.',
    details: [
      'High Capacity: Holds up to 100 Liters of clothes, making it ideal for families or large weekly loads.',
      "Smart Lid Design: Features an attached top lid that keeps clutter hidden and prevents household dust or odors from escaping.",
      "Removable Mesh Bag: Includes an internal liner with built-in handles that detaches quickly so you don't have to drag the entire hamper.",
    ],
      specs:[
      ["Lot", "46"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  },
  {
    id: "computer-desk",
    name: "Computer Desk",
    code: "computer-desk", 
    currentBid: "0",
    image: "/products/computer-desk.jpg",
    accent: "#dc2626",
    description:
      'Compact Workspace Solution: This modern computer desk features a streamlined white finish that seamlessly blends into contemporary home offices, bedrooms, or tight studio apartments. Its narrow footprint maximizes usable work surface without overwhelming smaller rooms.',
    details: [
      'Ergonomic Front Cutout: Features a contoured front edge that allows you to sit closer to the desktop for more natural arm positioning during long typing or writing sessions.',
      "Dual-Tier Construction: Includes a built-in lower shelf designed to store books, papers, or small electronics to help keep the main surface completely clutter-free.",
      "Durable Mixed Materials: Engineered with sleek, easy-to-clean composite wood panels secured to a rigid square-tube metal frame for dependable daily stability.",
      'Multi-Functional Setup: Functions efficiently as a dedicated laptop station, a writing desk for students, or a clean vanity table for personal grooming.',
    ],
      specs:[
      ["Lot", "47"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  },
   {
    id: "floor-lamp",
    name: "white LED floor lamp",
    code: "floor-lamp", 
    currentBid: "0",
    image: "/products/floor-lamp.jpg",
    accent: "#dc2626",
    description:
      'This modern LED floor lamp features a ultra-sleek, minimalist silhouette with a slim white metal frame that blends effortlessly into any contemporary workspace or bedroom. Designed explicitly for targeted illumination, its integrated light head works with a flexible gooseneck to deliver energy-efficient task lighting right where you need it.',
    details: [
      'Flexible Directional Arm: The upper gooseneck easily bends 360 degrees to angle focused light precisely over books, laptops, or crafting projects.',
      "Integrated LED Technology: Built-in energy-efficient LEDs provide bright, eye-straining-reduction illumination without needing frequent bulb replacements.",
      "Touch-Controlled Dimming: Features an integrated touch sensor along the body to easily toggle between multiple brightness levels and light color temperatures.",
    ],
      specs:[
      ["Lot", "48"],
      ["Included", "Full set"],
      ["Price in origin country", "$25"],
    ],
  }, 
  {
    id: "Toddler-Tower",
    name: "Toddler Tower",
    code: "Toddler-Tower", 
    currentBid: "0",
    image: "/products/Toddler-Tower.jpg",
    accent: "#dc2626",
    description:
      'This white wooden toddler learning tower is designed to safely elevate children to counter height so they can participate in daily kitchen activities. It features an integrated black chalkboard panel on the back to provide a creative drawing surface when the tower is not in use.',
    details: [
      'Safety Guardrails: Equipped with high side panels and a front safety rail to keep young children from losing their balance.',
      "Dual-Level Steps: Includes a sturdy bottom step and an elevated standing platform tailored for easy climbing.",
      "Integrated Blackboard: Features a built-in chalkboard on the rear facing panel for mess-free drawing and creative play.",
    ],
      specs:[
      ["Lot", "49"],
      ["Included", "Full set"],
      ["Price in origin country", "$60"],
    ],
  }, 
  {
    id: "Sharp-Aquos-40-inch",
    name: 'Sharp Aquos 40-inch',
    code: "Sharp-Aquos-40-inch", 
    currentBid: "0",
    image: "/products/Sharp-Aquos.jpg",
    accent: "#dc2626",
    description:
      'This 40-inch Sharp AQUOS Smart TV delivers a crisp, immersive viewing experience combining Full HD 1080p picture quality with a modern, borderless frameless design. Powered by TiVo OS and featuring built-in Freely, it provides an intuitive, content-first navigation hub to easily stream live and on-demand UK television strictly via Wi-Fi.',
    details: [
      "Screen Size: 40 inches (101 cm diagonal screen size).",
      'Display Resolution: Full HD (1920 x 1080) with a 60Hz refresh rate.',
      'High Dynamic Range (HDR): Enhances contrast and colors with support for HDR10 and HLG formats.',
    ],
      specs:[
      ["Lot", "50"],
      ["Included", "Full set"],
      ["Price in origin country", "£180"],
    ],
  },
  {
    id: "Antique-Style-Wall-Mirror",
    name: "Black Ornate Antique Style Wall Mirror",
    code: "Antique-Style-Wall-Mirror", 
    currentBid: "0",
    image: "/products/Antique-Style-Wall-Mirror.jpg",
    accent: "#dc2626",
    description:
      'This black ornate antique-style wall mirror features a decorative Baroque-inspired frame with detailed floral motifs. It can be mounted on the wall in either portrait or landscape orientation to add vintage charm to any room.',
    details: [
      'Glass Quality: Features high-quality silvered mirror glass',
      'Placement: Ideal as an accent piece for hallways, living rooms, or bathrooms',
    ],
      specs:[
      ["Lot", "51"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  }, 
  {
    id: "vibration-plate",
    name: "Vibration Plate",
    code: "vibration-plate", 
    currentBid: "0",
    image: "/products/vibration-plate.jpg",
    accent: "#dc2626",
    description:
      'This compact fitness platform uses rapid oscillating vibrations to stimulate your muscles, forcing them to contract and relax dozens of times per second. It is designed for home use to enhance traditional exercises like squats, planks, and push-ups by increasing muscle engagement and boosting circulation.',
    details: [
      'Multi-Stance Surface: The rubber platform features distinct traction zones that simulate walking, jogging, or running depending on how wide you place your feet.',
      'Adjustable Intensity: It offers multiple preset workout programs and manual speed settings ranging from 1 to 99 levels',
      'Resistance Band Anchors: Small metal loops on the underside allow you to attach elastic bands for simultaneous upper-body strength training.',
    ],
      specs:[
      ["Lot", "52"],
      ["Included", "Full set"],
      ["Price in origin country", "$80"],
    ],
  },
  {
    id: "ride",
    name: "Baby Ride-On",
    code: "ride", 
    currentBid: "0",
    image: "/products/ride.jpg",
    accent: "#dc2626",
    description:
      'This multi-functional 5-in-1 baby ride-on toy is crafted from ultra-lightweight, shock-absorbing Expanded Polypropylene (EPP) foam. Its minimalist beige design features a friendly cartoon face and a sturdy T-bar handle, making it a safe and silent choice for indoor play.',
    details: [
      'Material: Made from soft, durable, and highly impact-resistant EPP foam.',
      "Ultra-Lightweight: Weighs only about 1.4 kg, allowing toddlers to move and steer it easily.",
      'Convertible Design: Adapts into a baby walker, scooter, parent-assisted push car, or a low caster board.',
    ],
      specs:[
      ["Lot", "53"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  },
    {
      id: "2meter-tent",
      name: "2x2 Meter Tent",
      code: "2meter-tent", 
      currentBid: "0",
      image: "/products/2meter-tent.jpg",
      accent: "#dc2626",
      description:
        'A 2x2 meter pop-up canopy tent provides a highly compact, space-efficient shading solution that is perfect for smaller backyards, patios, or tight market stalls. Its minimal footprint effortlessly protects single lounge setups, balconies, and entryways from the elements.',
      details: [
        'Compact Coverage: Provides 4 square meters of shade, perfectly sizing over a single chaise lounge or small bistro set.',
        'Easy One-Person Setup: Features a lightweight, accordion-style folding frame that locks into place quickly without tools.',
        'Highly Portable: Fits easily into compact vehicle trunks and is significantly lighter to transport than standard 3x3m models.',
      ],
        specs:[
        ["Lot", "54"],
        ["Included", "Full set"],
        ["Price in origin country", "$60"],
      ],
    }, 
     {
    id: "Silvercrest-microwave",
    name: "Silvercrest Kitchen Tools microwave",
    code: "Silvercrest-microwave", 
    currentBid: "0",
    image: "/products/Silvercrest-microwave.jpg",
    accent: "#dc2626",
    description:
      'The Silvercrest SMW 700 D3 is a compact 17-liter standalone microwave that delivers a 700-watt power output for daily heating and defrosting tasks. It features straightforward manual or digital controls and a space-saving footprint ideal for smaller kitchens.',
    details: [
      'Capacity: 17-liter internal volume with a 24.5 cm glass turntable.',
      'Power: 700W cooking output across 6 power levels, drawing 1,100W of power.',
      'Dimensions: Measures approximately 44.6 x 24.1 x 35.9 cm and weighs around 10 kg.',
    ],
      specs:[
      ["Lot", "55"],
      ["Included", "Full set"],
      ["Price in origin country", "$70"],
    ],
  },
   {
    id: "WOTSTA",
    name: "WOTSTA Ergonomic Gaming Chair",
    code: "WOTSTA", 
    currentBid: "0",
    image: "/products/WOTSTA.jpg",
    accent: "#dc2626",
    description:
      'The WOTSTA Ergonomic Gaming Chair is a racing-style computer seat designed for comfort during long gaming or work sessions. It features a sleek black faux-leather finish accented by geometric contrast stitching and an integrated retractable footrest.',
    details: [
      'Ergonomic Cushions: Includes removable neck and lumbar pillows to improve posture.',
      'Full Recline: Features an adjustable high-back mechanism for leaning back.',
      'Built-in Footrest: Slides out easily from underneath the seat cushion for relaxation.',
    ],
      specs:[
      ["Lot", "56"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  }, 
  {
    id: "Trash-Bin",
    name: "SONGMICS Kitchen Pedal Trash Bin",
    code: "Trash-Bin", 
    currentBid: "0",
    image: "/products/Trash-Bin.jpg",
    accent: "#dc2626",
    description:
      'TThis SONGMICS stainless steel pedal trash can features a modern rectangular silhouette with curved edges, a soft-close lid, and a wide hands-free step pedal. The durable metal exterior is finished in an elegant almond-beige tone, designed to blend seamlessly into contemporary kitchen decors.',
    details: [
      'Quiet-close lid: Features a built-in soft-close mechanism that ensures the lid shuts gently and silently without slamming.',
      'Easy maintenance: Includes a removable plastic inner bucket with a practical metal handle for quick waste disposal and hassle-free cleaning.',
      "Hands-free operation: Equipped with a wide, sturdy steel foot pedal for convenient and hygienic opening.",
    ],
      specs:[
      ["Lot", "57"],
      ["Included", "Full set"],
      ["Price in origin country", "€50"],
    ],
  }, 
  {
    id: "Storage-Rack",
    name: "Storage Rack",
    code: "Storage-Rack", 
    currentBid: "0",
    image: "/products/Storage-Rack.jpg",
    accent: "#dc2626",
    description:
      'This 3-tier metal space-saving rack is designed to fit directly over a toilet or washing machine to maximize vertical storage. It features an open bottom clearance with multiple upper shelves and a top hanging bar to organize household items efficiently.',
    details: [
      'Multi-Tier Storage: Features a solid main shelf and an upper wire rack tier for organizing detergents, toiletries, or baskets.',
      "Top Hanging Bar: The reinforced top frame doubles as a rail for hanging clothes hangers, towels, or spray bottles.",
      "Space-Saving Build: Utilizes unused vertical wall space without taking up extra footprint in compact bathrooms or laundry rooms.",
    ],
      specs:[
      ["Lot", "58"],
      ["Included", "Full set"],
      ["Price in origin country", "$20"],
    ],
  },
  {
    id: "storage-organizer",
    name: "Multi-compartment storage organizer",
    code: "storage-organizer", 
    currentBid: "0",
    image: "/products/storage-organizer.jpg",
    accent: "#dc2626",
    description:
      'This modern white asymmetrical low bookcase features a multi-level geometric layout designed for functional storage and display. Its versatile open-concept build allows it to double as a stylish accent shelf, a low media console, or a creative room divider.',
    details: [
      'Staggered Layout: Features asymmetrical partitions that add a contemporary, architectural element to any room.',
      "Multi-Functional Design: Functions beautifully as a bookshelf, decorative display unit, or low-profile TV console.",
      "Open Storage: Provides easy visibility and accessibility from multiple angles, perfect for compact spaces.",
    ],
      specs:[
      ["Lot", "59"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  }, 
   {
    id: "Mobile-Air-Cooler",
    name: "Switch On Mobile Air Cooler",
    code: "Mobile-Air-Cooler", 
    currentBid: "0",
    image: "/products/Mobile-Air-Cooler.jpg",
    accent: "#dc2626",
    description:
      "This Switch On Portable Air Cooler is a 65W evaporative cooling appliance designed for flexible home ventilation. It utilizes a 4-liter water tank to provide either standard fan airflow or active, water-chilled cooling.",
    details: [
      "Power Output: 65 W energy consumption.",
      'Tank Capacity: 4-liter water capacity.',
      'Cable Length: 1.8-meter electrical cord.',
    ],
      specs:[
      ["Lot", "60"],
      ["Included", "Full set"],
      ["Price in origin country", " $100"],
    ],
  },
   {
    id: "l-desk",
    name: 'L-shaped computer desk',
    code: "l-desk", 
    currentBid: "0",
    image: "/products/l-desk.jpg",
    accent: "#dc2626",
    description:
      'This reversible L-shaped computer desk features a space-saving corner design in a matte grey finish with a sturdy black metal frame. It is engineered with integrated storage solutions, making it an ideal minimalist workstation for home offices, bedrooms, or small gaming setups.',
    details: [
      "Reversible Layout: The desk configuration can be assembled with the shelving unit on either the left or right side to fit your room's floor plan.",
      'Integrated Storage: Features a built-in 2-tier open bookshelf under the return side, perfect for storing books, binders, or a computer tower.',
      'Side Organizer Pouch: Includes a detachable canvas hanging pocket on the outer edge for quick access to files, notebooks, or a tablet.',
      'Built-in Power: Includes an integrated power strip recess on the top surface (typical for this model) to easily plug in monitors and charge devices.',
    ],
      specs:[
      ["Lot", "61"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
  {
    id: "cat-tree",
    name: 'Cat Tree',
    code: "cat-tree", 
    currentBid: "0",
    image: "/products/cat-tree-small.png",
    accent: "#dc2626",
    description:
      'This compact and functional multi-level cat tree blends a cozy condo hideaway with an elevated observation platform to create the perfect activity center for indoor cats. Its neutral beige plush fabric covers a sturdy design that offers dedicated areas for recreation, scratching, and privacy while seamlessly matching home decor.',
    details: [
      "Cozy Condo Hideaway: Features a square ground-level kennel with a circular entry hole, offering a private, darkened sleeping cave for secure resting.",
      "Observation Platform: Equipped with a flat top perch that gives cats an elevated vantage point to comfortably lounge or watch their surroundings.",
      "Integrated Scratching Post: Built with a sturdy central pillar wrapped in natural sisal rope to satisfy scratching instincts and keep claws away from furniture.",
      'Interactive Toy: Includes a soft, dangling plush pom-pom ball suspended directly under the upper deck to promote healthy exercise and playful engagement.',
    ],
      specs:[
      ["Lot", "62"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },
  {
    id: "Massage-Gun",
    name: "Massage Gun",
    code: "Massage-Gun", 
    currentBid: "0",
    image: "/products/Massage-Gun.jpg",
    accent: "#dc2626",
    description:
      'The image shows a Cotsoco Cordless Handheld Muscle Massage Gun designed for deep tissue percussion therapy and muscle relaxation. The packaging features a gift ribbon motif and highlights key features like strong power, silent operation, and multi-speed adjustments.',
    details: [
      'Speed Control: Features multiple speed levels to adjust intensity.',
      "Quiet Design: Built with a low-noise motor for quiet use.",
      "Cordless Operation: Powered by a built-in rechargeable battery.",
    ],
      specs:[
      ["Lot", "63"],
      ["Included", "Full set"],
      ["Price in origin country", "$35"],
    ],
  },
   {
    id: "BlackFire-Pit",
    name: "BlackFire Pit for Outside",
    code: "BlackFire-Pit", 
    currentBid: "0",
    image: "/products/BlackFire-Pit.jpg",
    accent: "#dc2626",
    description:
      'This 30-inch wood-burning outdoor fire pit offers a versatile 2-in-1 design that functions as both a warm backyard bonfire center and a functional charcoal barbecue grill. It features a heavy-duty alloy steel construction with an integrated outer safety rail, patterned lattice ventilation cutouts, and a removable 360-degree swivel cooking grate.',
    details: [
      'Ventilated Bottom: Specially designed air vents ensure charcoal or firewood burns completely with better airflow.',
      'Debris & Ash Plate: Comes equipped with an extra base ash plate to prevent hot embers from damaging your deck or patio.',
      "Stable Tri-Leg Base: Built with three symmetrically distributed steel legs to keep the main structure secure and shake-free during cooking.",
    ],
      specs:[
      ["Lot", "64"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
    {
    id: "SUNNIGOO",
    name: "SUNNIGOO N7PRO Electric Scooter",
    code: "100397848", 
    currentBid: "0",
    image: "/products/sunnigoo.jpg",
    accent: "#dc2626",
    description:
      "The SUNNIGOO N7PRO is a lightweight, foldable electric scooter designed for seamless urban commuting and short daily trips. It combines an efficient electric drivetrain with smart smartphone connectivity to offer a reliable, low-maintenance alternative to traditional city transit.",
    details: [
      '350W Front Motor: Reaches top speeds of 25–30 km/h with 3 adjustable speed modes.',
      "10.4Ah Battery: Provides a practical travel range of up to 25–30 km per charge.",
      '8.5" Honeycomb Tires: Delivers puncture-proof durability with no risk of flat tires.',
    ],
      specs:[
      ["Lot", "65"],
      ["Included", "Full set"],
      ["Price in origin country", "€180"],
    ],
  },
   {
    id: "bathroom-cabinet",
    name: "wall-mounted bathroom cabinet",
    code: "bathroom-cabinet", 
    currentBid: "0",
    image: "/products/bathroom-cabinet.jpg",
    accent: "#dc2626",
    description:
      'This is a sleek, white wall-mounted bathroom medicine cabinet featuring a dual-door setup lined with full-coverage exterior mirrors. Its compact, shallow profile houses integrated horizontal shelving designed to optimize vertical wall storage without taking up valuable floor space',
    details: [
      'Dual Mirrored Doors: Combines practical bathroom mirrors with hidden storage to make grooming routines easy while making small spaces feel brighter and larger',
      "Space-Saving Wall Mount: Features top-mounted hanging brackets intended for safe positioning directly over bathroom vanities or wash-basins",
      'Adjustable Internal Shelving: Built with adjustable or fixed inner compartments perfect for organizing daily toiletries, medicine bottles, and makeup',
    ],
      specs:[
      ["Lot", "66"],
      ["Included", "Full set"],
      ["Price in origin country", "$70"],
    ],
  },
   {
    id: "Bamboo-Frame-Wall-Mirror",
    name: "Bamboo Frame Wall Mirror",
    code: "Bamboo-Frame-Wall-Mirror", 
    currentBid: "0",
    image: "/products/Bamboo-Frame-Wall-Mirror.jpg",
    accent: "#dc2626",
    description:
      'This scandinavian-style oval wall mirror features an eco-friendly natural bamboo frame suspended by an adjustable faux-leather hanging strap. It blends minimalistic design with practical functionality, making it a perfect decorative accent for modern, bohemian, or contemporary spaces.',
    details: [
      'Dimensions: Measures approximately 44 x 77 cm (17.3 x 30.3 inches).',
      'Safety Design: Built with high-definition glass covered by an explosion-proof safety film.',
      "Adjustable Strap: The durable hanging strap can be shortened or lengthened to customize your placement height.",
    ],
      specs:[
      ["Lot", "67"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  },
   {
    id: "Waffle-Maker",
    name: "N8werk Premium Waffle Maker",
    code: "B08P26GV7N",
    currentBid: "0",
    image: "/products/Waffle-Maker.jpg",
    accent: "#dc2626",
    description:
      "The N8WERK Premium Waffle Iron in the Midnight Edition is a 1600-watt appliance featuring specialized automated baking programs. It utilizes dual non-stick plates and an integrated LCD display to deliver precise, evenly browned waffles customized to your preference.",
    details: [
      "Power Output: 1600 Watts ensures swift preheating and uniform heat across the plates.",
      'Baking Programs: 5 automatic settings optimized for Belgian, classic, chocolate, and buttermilk waffles, plus a manual option.',
      'Customization: 7 browning levels and 2 texture options let you choose between deep-crisp or soft-centered finishes.',
    ],
      specs:[
      ["Lot", "68"],
      ["Included", "Full set"],
      ["Price in origin country", "€100"],
    ],
  }, 
    {
    id: "handheld-garment-steamer",
    name: "Handheld Garment Steamer",
    code: "CY-801",
    currentBid: "0",
    image: "/products/steamer.jpg",
    accent: "#dc2626",
    description:
      "This high-power handheld garment steamer features a fast-heating design that smooths out tough wrinkles quickly and effortlessly. It is an ideal portable solution for refreshing a wide variety of everyday clothing fabrics both at home and on the go",
    details: [
      "Water Reservoir: Offers a generous 320 ml capacity for extended steaming time without constant refilling.",
      'Speedy Heat-Up: Ready to use in just 20 seconds to accommodate quick, last-minute wardrobe touch-ups.',
      'Steam Settings: Equipped with 3 adjustable power gears to safely tailor the heat to delicate silks or heavy jackets.',
    ],
      specs:[
      ["Lot", "69"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },
   {
    id: "Parkside-4V-Cordless-Cross-Line-Laser",
    name: 'Parkside 4V Cordless Cross Line Laser',
    code: "B0FZFKKF31", 
    currentBid: "0",
    image: "/products/Cross-Line.webp",
    accent: "#dc2626",
    description:
      'This rechargeable laser level projects clear 360-degree horizontal and vertical alignment lines for precise construction and DIY projects. It features an integrated lithium-ion battery and comes equipped with a multi-section extendable tripod stand.',
    details: [
      "Projection range: Up to 20 meters under optimal conditions.",
      'Accuracy rating: Self-leveling within ±0.4 mm/m.',
      'Power system: Integrated 4V (2Ah) Lithium-Ion battery with a USB-C charging port.',
      'Mounting base: Included floor tripod with an adjustable center column and bubble level.',
    ],
      specs:[
      ["Lot", "70"],
      ["Included", "Full set"],
      ["Price in origin country", "€95"],
    ],
  }, 
  {
    id: "Garden-Parasol",
    name: "SONGMICS Garden Parasol Umbrella",
    code: "Garden-Parasol", 
    currentBid: "0",
    image: "/products/Garden-Parasol.jpg",
    accent: "#dc2626",
    description:
      'The SONGMICS 2.7m Garden Parasol Umbrella is a premium octagonal outdoor sunshade designed to provide reliable UV protection for patios, balconies, and gardens. It features a user-friendly crank mechanism and a flexible tilt option to keep your outdoor seating area comfortable and shaded all day long.',
    details: [
      'Sun Protection: Features a durable 180 g/m² polyester canopy that blocks over 98% of UV rays with a UPF 50+ rating.',
      'Dual-Tilt System: Equipped with a push-button mechanism that tilts the umbrella up to 30° in two directions to block the shifting sun.',
      'Easy Operation: Uses a smooth aluminium crank handle for effortless opening and closing.',
    ],
      specs:[
      ["Lot", "71"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  }, 
   {
    id: "circle-miror",
    name: "Minimalist Round Wall Mirror",
    code: "circle-miror", 
    currentBid: "0",
    image: "/products/circle-miror.jpg",
    accent: "#dc2626",
    description:
      'This modern, minimalist round wall mirror features a sleek and durable black metal frame that effortlessly complements contemporary home decor. Its circular profile acts as an elegant visual focal point, making it a highly versatile accent piece for entryways, bathrooms, or living spaces.',
    details: [
      'Sleek Frame: Crafted with a slim, black-finished profile for a clean and contemporary appearance.',
      "Space-Enhancing: Effectively bounces natural light to make tight spaces feel bright, open, and more expansive.",
      'Versatile Decor: Integrates seamlessly into various styling layouts, serving as a functional vanity mirror or an artistic wall accent.',
    ],
      specs:[
      ["Lot", "72"],
      ["Included", "Full set"],
      ["Price in origin country", "$40"],
    ],
  },
   {
    id: "Pizza-Oven",
    name: "Silvercrest High Temperature Pizza Oven",
    code: "100390965", 
    currentBid: "0",
    image: "/products/Pizza-Oven.jpg",
    accent: "#dc2626",
    description:
      "The SilverCrest High Temperature Pizza Oven is a 1200-watt tabletop appliance designed to bake authentic, Italian-style pizzas at home. It utilizes a heavy ceramic pizza stone and dual heating elements to rapidly replicate the intense environment of a traditional pizza stone setup.",
    details: [
      'High Heat Capability: Reaches temperatures up to 400°C for fast, crispy crusts.',
      "Even Baking: Equipped with a 30 cm removable ceramic pizza stone that retains and distributes heat evenly.",
      'Dual Heating: Built with both top and bottom heating elements to cook toppings and crust simultaneously.',
    ],
      specs:[
      ["Lot", "73"],
      ["Included", "Full set"],
      ["Price in origin country", "€60"],
    ],
  },
  {
    id: "songmics-swing",
    name: "Songmics Swing",
    code: "songmics-swing", 
    currentBid: "0",
    image: "/products/songmics-swing.jpg",
    accent: "#dc2626",
    description:
      'The SONGMICS GDC187G02 is a boho-style hanging swing chair designed for cozy indoor and outdoor relaxation. It features an anthracite grey polyester-cotton blend seat supported by a heavy-duty wooden spreader bar.  ',
    details: [
      'High Capacity: Supports a maximum static weight of 150 kg.',
      'Comfort Pack: Includes two matching cushions and a thick, soft padded seat.',
      'Storage Pocket: Built-in side pocket holds your book, phone, or drinks.',
    ],
      specs:[
      ["Lot", "74"],
      ["Included", "Full set"],
      ["Price in origin country", "$35"],
    ],
  },  
    {
    id: "Coocaa-43",
    name: 'Coocaa 43-inch 4K UHD Roku Smart LED TV',
    code: "Coocaa-43-inch", 
    currentBid: "0",
    image: "/products/Coocaa-43.jpg",
    accent: "#dc2626",
    description:
      'This 43-inch Smart TV integrates an ultra-sharp 4K Ultra HD panel with the streamlined and highly intuitive Roku TV operating system. It serves as an affordable, user-friendly home entertainment hub that simplifies streaming by bringing all major applications and dynamic HDR picture quality together into a single, cohesive interface.',
    details: [
      "Display Technology: Features a 43-inch Direct LED backlit panel with a crisp 3840 x 2160 native resolution and a standard 60Hz refresh rate.",
      'High Dynamic Range: Outfitted with HDR10 and HLG formatting to improve contrast mapping and highlight detailing.',
      'Smart Ecosystem: Fully compatible with Apple AirPlay, Apple Home, Amazon Alexa, and Google Home voice ecosystem controls.',
    ],
      specs:[
      ["Lot", "75"],
      ["Included", "Full set"],
      ["Price in origin country", "€180"],
    ],
  },
   {
    id: "baby-bed",
    name: "Baby Bed",
    code: "baby-bed", 
    currentBid: "0",
    image: "/products/baby-bed.jpg",
    accent: "#dc2626",
    description:
      ' ',
    details: [
      '',
      '',
      '',
    ],
      specs:[
      ["Lot", "76"],
      ["Included", "Full set"],
      ["Price in origin country", "$35"],
    ],
  },  
    {
    id: "ELEPHAS-W13",
    name: "ELEPHAS W13 Projector",
    code: "ELEPHAS-W13", 
    currentBid: "0",
    image: "/products/ELEPHAS-W13.jpg",
    accent: "#dc2626",
    description:
      "The ELEPHAS W13 is a highly compact, budget-friendly mini portable LED projector engineered for personal entertainment and casual backyard movie nights. It handles direct streaming inputs and smartphone mirroring smoothly, delivering a versatile home theater solution without complex configuration.",
    details: [
      "Resolution & Input: Supports 1080P Full HD scaling and clear input video configuration with vivid 24-bit true color palette tracking.",
      'Wireless Casting: Features embedded Wi-Fi mirroring optimized to synchronize seamlessly via AirPlay and Miracast with iOS and Android devices.',
      'Hardware Ports: Equipped with versatile analog and digital interface docks including HDMI, dual USB, VGA, AV, and a 3.5mm headphone jack.',
    ],
      specs:[
      ["Lot", "77"],
      ["Included", "Full set"],
      ["Price in origin country", " $55"],
    ],
  },
  {
    id: "Barbara-Klein-Mini-Electric-Elliptical",
    name: 'Barbara Klein Mini Electric Elliptical',
    code: " JF-J-10",
    
    currentBid: "0",
    image: "/products/B&K.png",
    accent: "#dc2626",
    description:
      "The Barbara Klein Mini Electric Elliptical Trainer is a compact, low-impact exercise machine designed for passive or active leg workouts while sitting down. It is ideal for senior mobility, physical therapy rehab, or burning light calories under an office desk.",
    details: [
      "Dual-Mode Operation: Functions as an automated electric pedal assist or manual resistance trainer.",
      "12 Speed Levels: Features adjustable motorized pacing to accommodate various fitness and mobility levels.",
      "Remote Controlled: Includes a wireless remote control to seamlessly alter speed and direction without bending over.",
      "Bi-Directional Pedaling: Supports both forward and reverse movement to target different leg muscle groups.",
      "Digital Display: Built-in LCD monitor tracks training data including time, speed, distance, and calories.",
    ],
      specs:[
      ["Lot", "78"],
      ["Included", "Full set"],
      ["Price in origin country", "$179"],
    ],
  },
  {
    id: "Sejoy-Cordless-Oral-Irrigator",
    name: "Sejoy Cordless Oral Irrigator",
    code: "CYQ-FC5091",
    currentBid: "0",
    image: "/products/flosser.jpg",
    accent: "#dc2626",
    description:
      "The Sejoy Cordless Oral Irrigator is a portable water flosser designed with a 1400mAh rechargeable lithium-ion battery for deep dental cleaning. It includes a dedicated inductive charging dock that doubles as a built-in tip organizer to keep accessories clean and accessible.",
    details: [
      "Long Battery Life: Features a built-in 1400mAh Li-ion battery providing an active continuous runtime of ≥ 30 minutes per full charge.",
      'Inductive Charging Base: Includes a convenient wireless charging dock that keeps the main handle powered up and neatly organizes your flossing tips.',
      'Independent Controls: Built with standalone, separate Power ON/OFF and Mode Selection buttons for intuitive, mess-free operation.',
    ],
      specs:[
      ["Lot", "79"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },
   {
    id: "SUNNIGOO-1",
    name: "SUNNIGOO N7PRO Electric Scooter",
    code: "100397848", 
    currentBid: "0",
    image: "/products/sunnigoo.jpg",
    accent: "#dc2626",
    description:
      "The SUNNIGOO N7PRO is a lightweight, foldable electric scooter designed for seamless urban commuting and short daily trips. It combines an efficient electric drivetrain with smart smartphone connectivity to offer a reliable, low-maintenance alternative to traditional city transit.",
    details: [
      '350W Front Motor: Reaches top speeds of 25–30 km/h with 3 adjustable speed modes.',
      "10.4Ah Battery: Provides a practical travel range of up to 25–30 km per charge.",
      '8.5" Honeycomb Tires: Delivers puncture-proof durability with no risk of flat tires.',
    ],
      specs:[
      ["Lot", "80"],
      ["Included", "Full set"],
      ["Price in origin country", "€180"],
    ],
  },
  {
    id: "GOURMETmaxx-FryUp",
    name: " GOURMETmaxx FryUp Vertical Double Air Fryer",
    code: "15305",
    currentBid: "0",
    image: "/products/Fryup.jpg",
    accent: "#dc2626",
    description:
      "The GOURMETmaxx FryUp is a space-saving vertical double-chamber air fryer designed to cook two different meals simultaneously. Its unique stacked basket design delivers the capacity of a large dual-zone fryer while using 32% less counter space.",
    details: [
      "Capacity: Large 10-liter total volume, making it suitable for family meals for up to 8 people.",
      'Power: Equipped with a powerful 2800-watt motor for fast, efficient, and even cooking.',
      'Interface: Features a modern, intuitive LED touch display that folds down 90° for easy storage.',
    ],
      specs:[
      ["Lot", "81"],
      ["Included", "Full set"],
      ["Price in origin country", "€160"],
    ],
  },
   {
    id: "vacum-cleaner",
    name: "Cyclone vacum cleaner 800W",
    code: "B0F1MSX2W7",
    currentBid: "0",
    image: "/products/vacuum-cleaner.webp",
    accent: "#dc2626",
    description:
      "The CLEANmaxx Multi-Zyklonstaubsauger is a compact, bagless cylinder vacuum cleaner designed for highly efficient household cleaning. It utilizes multi-cyclone technology to separate dirt from the airflow, maintaining constant, powerful suction without the need for bags.",
    details: [
      "Suction Power: Delivers a strong 17 kPa maximum suction force.",
      'Motor Performance: Equipped with an energy-efficient 800-watt motor.',
      'Dust Capacity: Features a easy-to-empty 2-liter dirt container.',
    ],
      specs:[
      ["Lot", "82"],
      ["Included", "Full set"],
      ["Price in origin country", "€45"],
    ],
  },
   {
    id: "Mini-Straight-Grinder",
    name: "Mini Straight Grinder",
    code: "Mini-Straight-Grinder", 
    currentBid: "0",
    image: "/products/Mini-Straight-Grinder.jpg",
    accent: "#dc2626",
    description:
      "The Parkside Performance 12V Cordless Fine Drill & Grinder Set is a versatile, high-precision rotary multi-tool built with a brushless motor. It is engineered for a wide variety of tasks including detailed drilling, milling, sanding, polishing, engraving, and cutting.",
    details: [
      "Brushless Motor: Provides exceptional efficiency, a longer service life, and reduced wear compared to standard brushed tools.",
      'Variable Speed Control: Offers an adjustable rotation range up to 32,000 RPM to easily match different materials and tasks.',
      '12V Lithium-Ion Battery: Uses a compact, interchangeable battery pack with a dedicated charging dock for convenient workspace mobility.',
    ],
      specs:[
      ["Lot", "83"],
      ["Included", "Full set"],
      ["Price in origin country", " $60"],
    ],
  },
    {
      id: "skateboard",
      name: 'WeSkate',
      code: "3108-1", 
      currentBid: "0",
      image: "/products/skateboard.jpg",
      accent: "#dc2626",
      description:
        'The WeSkate 3108-1 is a complete, pre-assembled standard skateboard featuring an 8-inch wide, 7-ply maple wood deck designed for entry-level riders. Built with a double kick concave shape and high-speed bearings, it provides a stable and highly responsive platform for children, teens, and adults learning fundamental stunts or casual cruising.',
      details: [
        "Durable Construction: Crafted with a high-density, 7-layer Canadian maple deck supported by strong 5-inch aluminum alloy trucks.",
        'Optimal Balance Support: Designed with a 20-degree upward tilt and a U-shaped concave profile to maximize steering responsiveness and control.',
        'Smooth Glide Performance: Equipped with shock-absorbing 50mm 85A polyurethane wheels and precision ABEC-7 high-speed bearings for a quiet, stable ride.',
        'Ready-to-Ride Setup: Arrives fully pre-assembled out of the box with permanent, anti-slip black emery grip tape for immediate use.',
      ],
        specs:[
        ["Lot", "84"],
        ["Included", "Full set"],
        ["Price in origin country", "$25"],
      ],
  },
  {
    id: "Vinyl",
    name: 'DIGITNOW! Bluetooth Vinyl Record Player ',
    code: "Vinyl", 
    currentBid: "0",
    image: "/products/Vitnly-player.jpg",
    accent: "#dc2626",
    description:
      'This multi-functional audio hub combines vintage record playback with modern wireless streaming capabilities. It allows users to play traditional vinyl format records, cassette tapes, or analog radio stations, while also featuring direct digital conversion features',
    details: [
      "Speed Selection: The belt-driven player supports three distinct playback options spanning 33, 45, and 78 RPM.",
      'Wireless Connections: Employs a built-in Bluetooth receiver to stream digital audio from phones or tablets to the integrated stereo speakers',
      'PC-Free Audio Encoding: Converts media directly from vinyl or cassette formats into standard digital MP3 files onto a connected USB flash drive or SD card.',
      'Classic Media Compatibility: Features an integrated side-loading cassette tape deck along with an analog AM/FM radio receiver.',
    ],
      specs:[
      ["Lot", "85"],
      ["Included", "Full set"],
      ["Price in origin country", "€50"],
    ],
  }, 
  {
    id: "Ultenic-1",
    name: 'Ultenic D6S Robot Vacuum Cleaner ',
    code: "Ultenic-D6S", 
    currentBid: "0",
    image: "/products/ultenic.jpg",
    accent: "#dc2626",
    description:
      'The Ultenic D6s is an ultra-slim 3-in-1 automated household cleaning appliance that sweeps, vacuums, and washes hard floors simultaneously. Equipped with smart gyroscopic navigation and intelligent mobile application controls, it maps efficient cleaning paths while effortlessly gliding beneath low furniture to tackle tough messes like dirt, stains, and pet hair.',
    details: [
      "Sonic Mopping Technology: Scrubs hard surfaces up to 3,000 vibrations per minute, allowing it to deep clean stubborn spots like muddy footprints and coffee stains.",
      '3000Pa Strong Suction: Easily draws up heavy debris, fine dust, and deeply embedded hair from both hard floors and carpets.',
      'Automatic Carpet Boost: Intelligently detects carpeted areas to automatically crank suction power to its absolute maximum capacity for deep fiber cleaning.',
      'Ultra-Thin 7.4 cm Build: Features an exceptionally low-profile design combined with infrared anti-drop sensors to seamlessly clean tight spaces without getting stuck or falling down stairs.',
    ],
      specs:[
      ["Lot", "86"],
      ["Included", "Full set"],
      ["Price in origin country", "$100"],
    ],
  },
   {
    id: "Electric-Toothbrush",
    name: "Sejoy Electric Toothbrush",
    code: "Electric-Toothbrush", 
    currentBid: "0",
    image: "/products/Electric-Toothbrush.jpg",
    accent: "#dc2626",
    description:
      'This sleek sonic electric toothbrush provides efficient plaque removal using high-frequency vibrations tailored to daily oral care. It features an ergonomic, waterproof handle paired with standard interchangeable brush heads for a comfortable and long-lasting clean.',
    details: [
      '3 Cleaning Modes: Offers specialized settings for standard cleaning, whitening, and sensitive teeth.',
      'Smart Auto-Timer: Features a built-in 2-minute timer with 30-second interval reminders to switch brushing zones.',
      "Long Battery Life: Rechargeable via a standard USB cable, providing weeks of use on a single full charge.",
    ],
      specs:[
      ["Lot", "87"],
      ["Included", "Full set"],
      ["Price in origin country", "$20"],
    ],
  },
   {
    id: "LaserPro",
    name: "Kizen LaserPro LP300 Infrared Thermometer",
    code: "LaserPro", 
    currentBid: "0",
    image: "/products/LaserPro.jpg",
    accent: "#dc2626",
    description:
      'This handheld non-contact laser temperature gun is designed to quickly and safely capture surface temperatures from a distance. It is ideal for residential, automotive, and culinary environments, allowing users to accurately audit heat levels on grills, pizza ovens, engines, and HVAC systems',
    details: [
      'Temperature Spectrum: Reads surface conditions spanning from -58°F to 1112°F (-50°C to 600°C).',
      'Distance Efficiency: Features a 12:1 distance-to-spot ratio, with a recommended 14-inch operational distance for maximum tracking precision.',
      'Material Adaptability: Outfitted with an adjustable emissivity range (0.1 to 1.0) to ensure accurate readings across varying material finishes.',
    ],
      specs:[
      ["Lot", "88"],
      ["Included", "Full set"],
      ["Price in origin country", "$25"],
    ],
  },
    {
    id: "Dartboard",
    name: "Sisal Bristle Dartboard",
    code: "Dartboard", 
    currentBid: "0",
    image: "/products/Dartboard.jpg",
    accent: "#dc2626",
    description:
      'This regulation-size 18-inch dartboard features a premium construction made from high-density, self-healing sisal fibers that easily withstand heavy usage. It incorporates a highly durable ultra-thin steel spider wire design engineered to minimize bounce-outs and maximize scoring accuracy.',
    details: [
      'Complete Starter Kit: Comes fully equipped with 6 steel tip darts (2 sets of 3), a pre-marked throw line, a measurement tape, and all necessary wall-mounting hardware.',
      "Self-Healing Sisal Fiber: The dense, premium fibers naturally spring back into shape after dart removal, preventing fraying and extending the board's lifespan.",
      'Rotatable Number Ring: Features a movable outer number ring, allowing you to evenly distribute wear and prolong target segment durability over time.',
    ],
      specs:[
      ["Lot", "89"],
      ["Included", "Full set"],
      ["Price in origin country", "$30"],
    ],
  },  
  {
    id: "SWFT-Volt",
    name: "SWFT Volt",
    code: "100397848", 
    currentBid: "0",
    image: "/products/SWFT-VOLT-01-BLK-FrontAngle-scaled.jpg",
    accent: "#dc2626",
    description:
      "The SWFT Volt is a lightweight, single-speed electric bike engineered for clean aesthetic appeal and efficient city commuting. It seamlessly blends a minimalistic, traditional fixie style with modern electric performance to simplify urban riding.",
    details: [
      'Sleek Frame: Features a built-in, non-removable battery for a clean look.',
      "City Speed: Reaches up to 20 mph using the throttle or pedal assist.",
      'Low Maintenance: Built with a simple single-speed drivetrain to eliminate complex gear systems.',
    ],
      specs:[
      ["Lot", "90"],
      ["Included", "Full set"],
      ["Price in origin country", "$700"],
    ],
  },
  {
    id: "Parkside-216-piece-socket",
    name: "Parkside 216-piece socket and ratchet tool set",
    code: "Parkside-216-piece-socket", 
    currentBid: "0",
    image: "/products/Parkside-216-piece-socket.jpg",
    accent: "#dc2626",
    description:
      "This Parkside 216-piece mechanic's tool kit features a comprehensive selection of metric sockets, ratchets, and bits housed in a durable carrying case. It is engineered from Chrome Vanadium steel to handle automotive maintenance, mechanical repairs, and everyday DIY projects.",
    details: [
      'Three Ratchets: Features 1/4", 3/8", and 1/2" drive fine-toothed ratchets with ergonomic, non-slip handles.',
      "Extensive Sockets: Includes standard, deep-well, E-Torx, and spark plug metric sockets.",
      'Combination Spanners: Equipped with a set of open-ended ring wrenches mounted in the lid.',
    ],
      specs:[
      ["Lot", "91"],
      ["Included", "Full set"],
      ["Price in origin country", "$90"],
    ],
  },
  {
    id: "Playtive-Fairy-Bouncy-Castle",
    name: 'Playtive Fairy Bouncy Castle',
    code: "879000115208", 
    currentBid: "0",
    image: "/products/Playtive-Fairy-Bouncy-Castle.webp",
    accent: "#dc2626",
    description:
      'The Playtive Fairy Bouncy Castle is an adorable, pink inflatable jumper designed to bring fairy-tale magic and active play to your backyard [1.4]. It features a built-in basketball hoop and a side ring-toss game to keep young children entertained for hours [1.6, 1.20].',
    details: [
      "Included Components: A 14-piece set featuring the bounce house, 1 inflatable basketball, 4 inflatable rings, and 8 ground pegs for stability.",
      'Safety & Build: Equipped with sturdy protective side walls and 8 separate air chambers with safety valves for quick deflation.',
      'Size & Capacity: Measures 160 x 180 x 160 cm (W x H x D) and supports a maximum total weight capacity of 50 kg.',
    ],
      specs:[
      ["Lot", "92"],
      ["Included", "Full set"],
      ["Price in origin country", "€35"],
    ],
  }, 
     {
    id: "Cordless-Ratchet",
    name: 'Cordless Ratchet',
    code: "Cordless-Ratchet", 
    currentBid: "0",
    image: "/products/Cordless-Ratchet.jpg",
    accent: "#dc2626",
    description:
      'The image displays a Parkside Cordless Ratchet 12V, a compact right-angle power tool designed for tight workspaces. It operates within the Parkside X 12V Team battery system to easily fasten or loosen nuts and bolts.',
    details: [
      "Maximum Torque: 54 Nm of fastening power.",
      'No-Load Speed: 0–250 rpm with variable speed control.',
      'Drive Size: 3/8" square drive with an included 3/8" to 1/2" socket adapter.',
      'Integrated LED Light: Illuminates dark or hidden work areas.',
    ],
      specs:[
      ["Lot", "93"],
      ["Included", "Full set"],
      ["Price in origin country", "€25"],
    ],
  },
  {
    id: "sevrin-microwave",
    name: "SEVERIN solo microwave",
    code: "sevrin-microwave", 
    currentBid: "0",
    image: "/products/sevrin-microwave.jpg",
    accent: "#dc2626",
    description:
      'This SEVERIN flatbed microwave utilizes a turntable-free ceramic base that provides 33% more usable cooking space for larger dishes. Its straightforward design features two analog rotary knobs on the right side for effortless control over power levels and cooking times.',
    details: [
      'Turntable-free design: Accommodates large, rectangular, or unusually shaped dinnerware easily.',
      'Simple mechanical knobs: Offers manual adjustments for quick power and timer selection.',
      'Effortless cleaning: Features a smooth, flat interior floor that wipes clean instantly.',
    ],
      specs:[
      ["Lot", "94"],
      ["Included", "Full set"],
      ["Price in origin country", "$80"],
    ],
  }, 
   {
    id: "Angle-Grinder",
    name: "Parkside 20V Cordless Angle Grinder",
    code: "Angle-Grinder", 
    currentBid: "0",
    image: "/products/Angle-Grinder.jpg",
    accent: "#dc2626",
    description:
      'This versatile cordless angle grinder from the Parkside X 20V Team series is engineered for efficient cutting, grinding, and brushing tasks across materials like metal, stone, and tile. Featuring a robust aluminum die-cast housing and a multi-position soft-grip handle, it balances high-speed precision with durable, user-friendly handling for DIY home workshops.',
    details: [
      'Variable Speed Control: Equipped with a 6-stage adjustable electronic speed dial to perfectly match the rotation to your specific material.',
      'Tool-Free Guard Adjustments: The 2-in-1 protective hood can be easily repositioned without extra tools to redirect sparks and flying debris quickly.',
      'Ergonomic 3-Position Handle: Includes an anti-slip front stabilizer handle that can be screwed into three separate positions for optimal control and safety.',
    ],
      specs:[
      ["Lot", "95"],
      ["Included", "Full set"],
      ["Price in origin country", "€25"],
    ],
  },
   {
    id: "Donergrill",
    name: 'Gourmetmaxx Dönergrill ',
    code: "B01ITGX62A", 
    currentBid: "0",
    image: "/products/Dönergrill.jpg",
    accent: "#dc2626",
    description:
      'This vertical tabletop electric grill lets you cook authentic street-style kebabs, gyros, and rotisserie chicken effortlessly right inside your home kitchen.',
    details: [
      "Powerful Heating Performance: Utilizes a 1400-watt heating element to deliver rapid, uniform heat distribution.",
      '360-Degree Continuous Rotation: Features a automated rotating central spit that ensures all sides of the meat brown and crisp evenly.',
      'Large Meat Capacity: Accommodates a hefty load up to 2 kg, making it an excellent size for cooking family-sized dinners.',
      'Healthier Grilling Concept: Built with a vertical, fat-free cooking structure that allows excess oil and grease to slide down into a removable stainless steel tray.',
    ],
      specs:[
      ["Lot", "96"],
      ["Included", "Full set"],
      ["Price in origin country", "€30"],
    ],
  }, 
   {
    id: "Charcoal-Grill",
    name: "Charcoal Grill BBQ",
    code: "Charcoal-Grill", 
    currentBid: "0",
    image: "/products/Charcoal-Grill.jpg",
    accent: "#dc2626",
    description:
      'This Healthy Choice Charcoal Grill BBQ Trolley is a portable outdoor charcoal grill featuring a durable black steel body and integrated wheels. It is equipped with two multi-tier wooden shelves for extra food prep and convenient storage.',
    details: [
      'Adjustable Grilling Heights: Features slots on the wind shield to adjust the chrome cooking grate across multiple levels.',
      'Manual Rotisserie: Includes a dedicated spit rod for manual slow-roasting over coal.',
      'High Portability: Built with two heavy-duty wheels and a side handle for quick repositioning.',
    ],
      specs:[
      ["Lot", "97"],
      ["Included", "Full set"],
      ["Price in origin country", "$50"],
    ],
  }, 
  {
    id: "Parkside-20V-Cordless-Impact-Wrench",
    name: 'Parkside 20V Cordless Drill Driver',
    code: "Impact-Wrench", 
    currentBid: "0",
    image: "/products/Impact-Wrench.jpg",
    accent: "#dc2626",
    description:
      'This powerful cordless impact wrench is engineered specifically for vehicle wheel maintenance and heavy-duty fastening jobs. It delivers high torque output across multiple pre-selectable speeds, offering DIY mechanics an efficient, budget-friendly alternative to premium brand tools.',
    details: [
      "Torque Adjustability: Features 5 pre-selectable levels (100 / 150 / 200 / 300 / 400 Nm max) for precise power management.",
      'Speed Profile: Operates with a variable no-load rotation speed of 0–2300 rpm and an impact frequency of 0–3000 bpm.',
      'Drive Setup: Built with a standard ½" external square tool holder compatible with common automotive impact sockets.',
      'System Integration: Fully compatible with all lithium-ion batteries under the shared Parkside X 20V Team ecosystem.',
    ],
      specs:[
      ["Lot", "98"],
      ["Included", "Full set"],
      ["Price in origin country", "€45"],
    ],
  }, 
   {
    id: "Ceiling-Fan",
    name: 'Ceiling Fan',
    code: "YM-QWABS001-52", 
    currentBid: "0",
    image: "/products/Ceiling-Fan.webp",
    accent: "#dc2626",
    description:
      'The YM-QWABS001-52 is a 52-inch modern, low-profile ceiling fan without a light designed for quiet and energy-efficient indoor or covered outdoor use. Operating on a reversible DC motor, this 3-blade minimalist fan delivers powerful airflow and comes equipped with a multi-functional wireless remote.',
    details: [
      "Motor: 35W energy-efficient reversible DC motor.",
      'Blades: 3 moisture-resistant ABS plastic blades',
      'Speed Settings: 6 adjustable wind speeds.',
    ],
      specs:[
      ["Lot", "99"],
      ["Included", "Full set"],
      ["Price in origin country", "75$"],
    ],
  },
  {
    id: "Microphones",
    name: "Rybozen Digital Vocal Mixer with Dual Wireless Microphones",
    code: "B07GRKXKC3", 
    currentBid: "0",
    image: "/products/Microphones.jpg",
    accent: "#dc2626",
    description:
      "This versatile karaoke kit seamlessly bridges your multimedia video source with an external sound system to deliver instant home entertainment. Equipped with dual high-frequency microphones and customizable rotary dials, it provides everything needed for crisp duets, events, or casual parties",
    details: [
      'Dual Wireless Microphones: Includes two handheld UHF mics with independent volume controls, plus two extra inputs for wired dynamic mics if needed.',
      "Custom Audio Mixing: Features 5 rotatable dials on the host receiver to immediately fine-tune music volume, individual mic inputs, echo levels, and tone",
      '100-Foot UHF Range: Provides a wireless operating distance of up to 100 feet (30 meters) with anti-interference frequency adjustment for complete mobility while performing',
    ],
      specs:[
      ["Lot", "100"],
      ["Included", "Full set"],
      ["Price in origin country", "$70"],
    ],
  },
   {
    id: "full-length-mirror",
    name: "Rectangular Full-length Mirror",
    code: "full-length-mirror", 
    currentBid: "0",
    image: "/products/full-length-mirror.jpg",
    accent: "#dc2626",
    description:
      'This is a white rectangular full-length mirror featuring a thick, clean frame design. It is versatile enough to be mounted vertically on a wall or simply leaned up against it to suit your space.',
    details: [
      'Design: Minimalist rectangular silhouette with a wide, matte white finish frame.',
      "Versatility: Suitable for bedrooms, hallways, or dressing areas as a sleek full-body dressing mirror.",
      'Placement: Can be securely wall-mounted or safely placed as a leaning accent piece.',
    ],
      specs:[
      ["Lot", "101"],
      ["Included", "Full set"],
      ["Price in origin country", "$60"],
    ],
  }, 
  {
    id: "PARKSIDE-PERFORMANCE-Cordless-Drill-Driver",
    name: "PARKSIDE PERFORMANCE Cordless Drill Driver",
    code: "B0FZFKKF31",
    currentBid: "0",
    image: "/products/Cordless-Drill-Driver.webp",
    accent: "#dc2626",
    description:
      "The Parkside Performance 12V Starter Set is a compact power tool bundle featuring a premium cordless drill driver and a high-torque impact screwdriver. Driven by wear-free, efficient brushless motors, this kit delivers exceptional power and longevity for demanding DIY and professional projects alike.",
    details: [
      "Dual Tool Power: Includes both the 12V Cordless Drill Driver (PBSPA 12) and the 12V Cordless Impact Driver (PDSSAP 12).",
      'Brushless Technology: Equipped with advanced brushless motors that significantly increase tool lifespan and runtime.',
      'Premium Power System: Packs two high-performance 12V Lithium-Ion batteries (2.0 Ah) and a 2.4A quick charger.',
    ],
      specs:[
      ["Lot", "102"],
      ["Included", "Full set"],
      ["Price in origin country", "€85"],
    ],
  },
  {
    id: "microscope",
    name: 'USB digital microscope',
    code: "B0D98FFJ4Y", 
    currentBid: "0",
    image: "/products/microscope.jpg",
    accent: "#dc2626",
    description:
      'This compact Bresser USB Digital Microscope offers continuous 50x to 1000x magnification for inspecting minerals, circuits, and biological samples. It features an integrated camera that streams or records detailed images directly to your computer screen.',
    details: [
      "Resolution: Captures clear photos and videos in Full HD 1920x1080 pixels.",
      'Illumination: Features an adjustable ring light with 8 dimmable LEDs for even lighting.',
      'Stand: Includes a versatile, multi-directional metal stand for stable, hands-free viewing.',
      'Software: Comes with a downloadable PC/Mac companion app for capturing images and measurements.',
    ],
      specs:[
      ["Lot", "103"],
      ["Included", "Full set"],
      ["Price in origin country", "€30"],
    ],
  },
  ];
export const featuredProduct = products[0]; 