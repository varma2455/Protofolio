import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'food-delivery',
    title: 'Online Food Delivery Application',
    tagline: 'Multi-role MERN food ordering ecosystem with discrete customer, admin, and delivery workflows.',
    category: 'Full-Stack MERN Application',
    categoryType: 'mern',
    featured: true,
    status: 'Completed',
    githubUrl: 'https://github.com/varma2455/OnlineFoodDelivery',
    liveDemoUrl: 'https://github.com/varma2455/OnlineFoodDelivery#readme',
    shortDescription:
      'A full-stack food delivery platform engineered with MongoDB, Express.js, React.js, and Node.js featuring separate customer, restaurant admin, and delivery driver workflows with persistent state management.',
    fullOverview:
      'The Online Food Delivery Application is a comprehensive end-to-end food ordering platform designed to address the fragmentation common in dining logistics. Built on the MERN stack, the system orchestrates three distinct operational roles: customers who browse curated menus and order meals, restaurant administrators who curate inventory and update culinary catalogs, and delivery personnel who monitor assigned fulfillment queues.',
    problemStatement:
      'Traditional digital food ordering prototypes often neglect role-based access separation, leading to insecure API surfaces, disjointed cart synchronization across page reloads, and inefficient database queries when fetching nested food item catalogs alongside customer order history.',
    solutionStrategy:
      'Architected a decoupled MERN application with a centralized Express REST API connected to MongoDB via Mongoose. Implemented stateless JWT authentication with role-based authorization middleware protecting administrative and delivery routes. Built a responsive React frontend with contextual cart persistence, responsive UI styling, and real-time state synchronization.',
    technologies: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'Mongoose ODM',
      'JWT Authentication',
      'Bcrypt',
      'REST APIs',
      'Tailwind CSS',
    ],
    primaryTech: {
      mongo: 'MongoDB Atlas / Local NoSQL document store with indexed collections for users, items, and orders.',
      express: 'Express.js micro-framework with structured router modularization and role authorization middleware.',
      react: 'React 18 SPA with React Router, context-driven cart state, and custom hook-based data fetchers.',
      node: 'Node.js runtime handling asynchronous non-blocking I/O and JSON REST payloads.',
    },
    keyFeatures: [
      {
        title: 'Multi-Tier Role Authentication',
        description: 'Secure JWT-based authentication with Bcrypt password hashing and role validation for Customer, Admin, and Delivery personnel.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Dynamic Food Catalog & Filtering',
        description: 'Rich catalog browsing with category segmentation, dietary filters, price sorting, and instant search queries.',
        icon: 'Search',
      },
      {
        title: 'Contextual Cart & Checkout',
        description: 'Client-side cart state hydrated from localStorage, calculating dynamic totals, taxes, and delivery fees.',
        icon: 'ShoppingCart',
      },
      {
        title: 'Order Placement & Audit History',
        description: 'Transactional order creation linking items, user reference, delivery address, and chronological status tracking.',
        icon: 'Clock',
      },
      {
        title: 'Restaurant Admin Management',
        description: 'Dedicated administrative interface for adding, updating, and removing menu items with image URLs and pricing controls.',
        icon: 'Settings',
      },
      {
        title: 'Fulfillment & Delivery Queues',
        description: 'Operational status update triggers (Pending -> Confirmed -> Out for Delivery -> Delivered) accessible by assigned roles.',
        icon: 'Truck',
      },
    ],
    workflows: [
      {
        title: 'Customer Workflow',
        audience: 'End Users',
        steps: [
          'Register or sign in with JWT token issuance stored in client memory/cookies.',
          'Browse menu items filtered by category, price, or rating.',
          'Add items to cart with live quantity manipulation.',
          'Provide delivery address and confirm checkout.',
          'Monitor order status in real time through the user order history dashboard.',
        ],
      },
      {
        title: 'Restaurant Admin Workflow',
        audience: 'Kitchen / Restaurant Staff',
        steps: [
          'Sign in with verified administrator credentials.',
          'Access protected /admin dashboard via role-verification middleware.',
          'Create new food items specifying name, description, price, category, and availability.',
          'Audit pending orders and update status to Preparation / Ready.',
        ],
      },
      {
        title: 'Delivery Partner Workflow',
        audience: 'Fulfillment Drivers',
        steps: [
          'Authenticate with delivery personnel permissions.',
          'Inspect the active order queue assigned to the geographical territory.',
          'Accept order and toggle transit status to "Out for Delivery".',
          'Confirm final delivery handoff to complete the order lifecycle.',
        ],
      },
    ],
    architectureDiagram: [
      {
        title: 'Client Layer',
        role: 'Single Page Application (React.js)',
        tech: ['React.js', 'React Router', 'Context API', 'Axios / Fetch'],
        details: [
          'Role-aware route guards (/admin, /delivery, /orders)',
          'Global CartContext & AuthContext providers',
          'Responsive grid layout with touch-friendly controls',
        ],
      },
      {
        title: 'API Gateway & Routing Layer',
        role: 'RESTful Server (Express.js & Node.js)',
        tech: ['Node.js', 'Express.js', 'CORS', 'Morgan Logger'],
        details: [
          'Modular route controllers: /api/auth, /api/food, /api/orders, /api/cart',
          'Centralized error-handling middleware',
          'JSON request payload sanitization and validation',
        ],
      },
      {
        title: 'Security & Middleware Layer',
        role: 'Authentication & Protection',
        tech: ['JSON Web Tokens', 'Bcrypt.js', 'Role Verification'],
        details: [
          'JWT verification middleware extracting user payload',
          'Role-checking guards (verifyAdmin, verifyDelivery)',
          'Password salting & secure hash comparison',
        ],
      },
      {
        title: 'Data Persistence Layer',
        role: 'Document Database (MongoDB)',
        tech: ['MongoDB', 'Mongoose ODM'],
        details: [
          'Strict schema definitions for User, FoodItem, Order, Category',
          'Mongoose pre-save hooks for password encryption',
          'Indexed queries on user email, order status, and item categories',
        ],
      },
    ],
    databaseDesign: [
      {
        name: 'User Schema',
        purpose: 'Stores credentials, personal profiles, and assigned operational roles.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique primary identifier' },
          { name: 'name', type: 'String', desc: 'Full user legal name' },
          { name: 'email', type: 'String', desc: 'Indexed unique email address' },
          { name: 'password', type: 'String', desc: 'Bcrypt hashed password' },
          { name: 'role', type: 'String', desc: 'Enum: "customer" | "admin" | "delivery"' },
          { name: 'address', type: 'Object', desc: 'Street, city, pincode, phone' },
        ],
      },
      {
        name: 'FoodItem Schema',
        purpose: 'Catalog items available for customer browsing and ordering.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique item identifier' },
          { name: 'name', type: 'String', desc: 'Display name of culinary item' },
          { name: 'description', type: 'String', desc: 'Ingredients and dietary notes' },
          { name: 'price', type: 'Number', desc: 'Base unit price in INR' },
          { name: 'category', type: 'String', desc: 'e.g. Burgers, Pizzas, Drinks, Meals' },
          { name: 'image', type: 'String', desc: 'Asset URL or relative path' },
          { name: 'isAvailable', type: 'Boolean', desc: 'Inventory availability flag' },
        ],
      },
      {
        name: 'Order Schema',
        purpose: 'Stores completed checkouts, item snapshots, pricing, and fulfillment state.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique order number' },
          { name: 'user', type: 'ObjectId', desc: 'Reference to User document' },
          { name: 'items', type: 'Array', desc: 'Sub-documents with item ref, quantity, price snapshot' },
          { name: 'totalAmount', type: 'Number', desc: 'Final calculated payable amount' },
          { name: 'status', type: 'String', desc: 'Enum: "Placed" | "Confirmed" | "Out For Delivery" | "Delivered"' },
          { name: 'deliveryAddress', type: 'Object', desc: 'Delivery location snapshot' },
          { name: 'createdAt', type: 'Date', desc: 'Timestamp of checkout' },
        ],
      },
    ],
    challenges: [
      {
        problem: 'Maintaining consistent cart state across unexpected browser reloads without hammering the database.',
        solution: 'Implemented a dual-layer synchronization model using a React Context provider paired with localized browser persistence, syncing with the MongoDB cart document upon user checkout.',
        outcome: 'Zero cart data loss on accidental browser refreshes, with zero additional network overhead during preliminary browsing.',
      },
      {
        problem: 'Preventing unauthorized users from triggering admin catalog modifications or delivery updates.',
        solution: 'Implemented strict middleware chaining in Express (`authMiddleware` followed by `roleMiddleware("admin")`) checking the decoded JWT claims on every sensitive route.',
        outcome: 'Complete isolation of privileged endpoints with immediate 403 Forbidden responses to unauthorized callers.',
      },
      {
        problem: 'Menu catalog search causing redundant re-renders on every keystroke.',
        solution: 'Applied custom debounce hooks and memoized React components (`useMemo` and `useCallback`) to throttle query evaluation.',
        outcome: 'Silky smooth 60fps typing response even with large menu datasets.',
      },
    ],
    previewMockup: {
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      accentColor: '#F59E0B',
      badge: 'Full-Stack MERN',
    },
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Web Application',
    tagline: 'High-performance MERN shopping platform with role-based access, cart workflows, and database query optimization.',
    category: 'Full-Stack Web Application',
    categoryType: 'ecommerce',
    featured: true,
    status: 'Completed',
    githubUrl: 'https://github.com/varma2455/MYNTRA',
    liveDemoUrl: 'https://github.com/varma2455/MYNTRA#readme',
    shortDescription:
      'A full-stack e-commerce web application featuring role-based access control, modular shopping cart mechanics, order placement workflows, product catalog filtering, lazy loading, and optimized MongoDB queries.',
    fullOverview:
      'The E-Commerce Web Application is an enterprise-inspired shopping platform designed for high performance and reliable transactional workflows. Drawing architectural principles from contemporary fashion e-commerce platforms, the application features comprehensive customer shopping journeys—from landing catalog discovery and faceted multi-attribute filtering to secure cart mutation and structured checkout tracking.',
    problemStatement:
      'E-commerce systems frequently suffer from performance degradation due to unoptimized database queries, unpaginated product payloads, and bloated initial JavaScript bundle sizes that slow down initial page loads.',
    solutionStrategy:
      'Engineered an Express.js backend with lean MongoDB projection queries, database indexing on product categories and SKU identifiers, and implemented server-side pagination. On the frontend, utilized React lazy loading (`React.lazy` and `Suspense`) alongside code-splitting to minimize bundle size, ensuring sub-second route transitions.',
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose ODM',
      'JWT Auth',
      'Code Splitting',
      'Lazy Loading',
      'RESTful APIs',
    ],
    primaryTech: {
      mongo: 'MongoDB document collection indexed by product category, brand, and pricing tier for fast queries.',
      express: 'Express.js backend providing transactional REST endpoints for product management and order records.',
      react: 'React component ecosystem with code-splitting, modular CSS/Tailwind, and state hooks.',
      node: 'Node.js asynchronous server environment orchestrating data serialization and validation.',
    },
    keyFeatures: [
      {
        title: 'Role-Based User Authentication',
        description: 'Secure registration and login with JWT tokens granting scoped capabilities to buyers versus store administrators.',
        icon: 'Lock',
      },
      {
        title: 'Faceted Product Search & Filtering',
        description: 'Multi-criteria filtering by category, brand, price spectrum, and stock availability with instant URL state persistence.',
        icon: 'Filter',
      },
      {
        title: 'Interactive Shopping Cart',
        description: 'Dynamic cart management allowing item quantity increments, removals, promo calculations, and price breakdowns.',
        icon: 'ShoppingBag',
      },
      {
        title: 'Product Catalog Administration',
        description: 'CRUD interface enabling authorized store managers to create, update descriptions, set stock counts, and delete products.',
        icon: 'Database',
      },
      {
        title: 'Order Tracking & History',
        description: 'Customer order history logging unique transaction IDs, purchased item snapshots, shipping destinations, and status.',
        icon: 'PackageCheck',
      },
      {
        title: 'Performance & Lazy Loading',
        description: 'Dynamic bundle loading using React.lazy and Suspense boundaries, preventing unnecessary asset loading on initial load.',
        icon: 'Zap',
      },
    ],
    workflows: [
      {
        title: 'Shopper Journey',
        audience: 'Registered & Guest Shoppers',
        steps: [
          'Browse curated collections with paginated product grids.',
          'View detailed product specifications, size guides, and inventory status.',
          'Add items to cart with localized validation and quantity caps.',
          'Authenticate or continue to checkout with verified shipping addresses.',
          'Receive confirmed order transaction with chronological status tracking.',
        ],
      },
      {
        title: 'Merchant & Admin Journey',
        audience: 'Store Inventory Managers',
        steps: [
          'Log in with administrative role claims.',
          'Review inventory levels across product categories.',
          'Add new inventory SKUs with pricing, stock thresholds, and specifications.',
          'Monitor all customer orders and transition fulfillment states.',
        ],
      },
    ],
    architectureDiagram: [
      {
        title: 'Presentation & React Layer',
        role: 'Client Interface',
        tech: ['React.js', 'React Router DOM', 'Context API', 'Vite Bundler'],
        details: [
          'Code-split routes using React.lazy and Suspense fallbacks',
          'Modular state containers for auth, cart, and search filters',
          'Responsive grid layout optimized for mobile and desktop screens',
        ],
      },
      {
        title: 'REST Controller & Service Layer',
        role: 'Application Server',
        tech: ['Express.js', 'Node.js', 'Middleware Pipeline'],
        details: [
          'Products Controller: paginated search, faceted filter pipelines',
          'Order Controller: transactional checkout and order state manipulation',
          'User Controller: registration, JWT token generation, profile updates',
        ],
      },
      {
        title: 'Data Access & Optimization Layer',
        role: 'Database & Query Engine',
        tech: ['MongoDB', 'Mongoose ODM'],
        details: [
          'Indexed compound keys on { category: 1, price: 1 }',
          'Mongoose `.lean()` projections to bypass heavy document overhead',
          'Referential integrity linking Order documents to User and Product collections',
        ],
      },
    ],
    databaseDesign: [
      {
        name: 'Product Schema',
        purpose: 'Defines commercial catalog items, inventory counts, pricing, and tags.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Primary product identifier' },
          { name: 'title', type: 'String', desc: 'Item marketing title' },
          { name: 'brand', type: 'String', desc: 'Manufacturer or brand label' },
          { name: 'price', type: 'Number', desc: 'Standard retail price' },
          { name: 'category', type: 'String', desc: 'Indexed category taxonomy' },
          { name: 'inStock', type: 'Number', desc: 'Current units available' },
          { name: 'images', type: 'Array', desc: 'List of product image URLs' },
        ],
      },
      {
        name: 'Order Schema',
        purpose: 'Transactional audit of customer purchases, amounts, and shipping records.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique transaction number' },
          { name: 'customer', type: 'ObjectId', desc: 'Reference to User document' },
          { name: 'orderItems', type: 'Array', desc: 'Array of item IDs, unit prices, and quantities' },
          { name: 'shippingAddress', type: 'Object', desc: 'Destination city, street, and contact' },
          { name: 'paymentStatus', type: 'String', desc: 'Enum: "Pending" | "Paid" | "Failed"' },
          { name: 'deliveryStatus', type: 'String', desc: 'Enum: "Processing" | "Dispatched" | "Delivered"' },
        ],
      },
    ],
    challenges: [
      {
        problem: 'Large product lists causing sluggish page response and excessive database memory consumption.',
        solution: 'Implemented server-side pagination with `.skip()` and `.limit()` combined with lean query projections returning only display fields.',
        outcome: 'Reduced query execution time by over 65% and kept memory consumption constant regardless of total product count.',
      },
      {
        problem: 'Over-fetching of product details when rendering simple thumbnail cards.',
        solution: 'Constructed custom GraphQL-like Mongoose projection selectors (`.select("title brand price images inStock")`) for grid endpoints.',
        outcome: 'Network payload size dropped from ~450KB to under 38KB per page request.',
      },
      {
        problem: 'Maintaining consistent cart synchronization across tab switches and user sign-in.',
        solution: 'Implemented a client-side cart reconciler that merges guest localStorage cart items into the authenticated user profile upon successful login.',
        outcome: 'Frictionless checkout conversion with zero abandoned items due to authentication redirects.',
      },
    ],
    previewMockup: {
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      accentColor: '#648CFF',
      badge: 'Full-Stack E-Commerce',
    },
  },
  {
    id: 'chat-application',
    title: 'Real-Time Chat Application',
    tagline: 'High-concurrency full-stack communication platform with WebSockets, private/group rooms, and MongoDB persistence.',
    category: 'Real-Time Full-Stack Application',
    categoryType: 'realtime',
    featured: true,
    status: 'Completed',
    githubUrl: 'https://github.com/varma2455/Real-Time-Chat-App',
    liveDemoUrl: 'https://github.com/varma2455',
    shortDescription:
      'A real-time messaging application supporting one-to-one and group communication, powered by Socket.io, Node.js, React.js, and MongoDB with instant message delivery, live typing indicators, and JWT authentication.',
    fullOverview:
      'The Real-Time Chat Application is an event-driven communication system built to deliver sub-100ms bidirectional messaging between connected clients. Combining the reactivity of React with the low-latency transport of Socket.io on a Node.js server, the system facilitates private conversations, multi-user chat rooms, active user presence detection, real-time typing indicators, and persistent chat logs backed by MongoDB.',
    problemStatement:
      'Standard HTTP polling introduces significant server overhead, high latency, and unnecessary network round trips when building conversational interfaces, making true instant communication unreliable.',
    solutionStrategy:
      'Engineered an event-driven architecture utilizing Socket.io WebSockets with HTTP fallback. Connected clients authenticate via JWT during the initial WebSocket handshake. Messages are simultaneously emitted to target socket rooms and asynchronously committed to MongoDB collections, guaranteeing both instantaneous delivery and durable audit history.',
    technologies: [
      'React.js',
      'Node.js',
      'Socket.io',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT Auth',
      'WebSockets',
      'Event-Driven Architecture',
    ],
    primaryTech: {
      mongo: 'MongoDB collection for persistent chat histories, user relations, and room memberships.',
      express: 'Express server initializing the HTTP listener and binding Socket.io server instances.',
      react: 'React client managing active conversation state, socket listeners, and auto-scrolling message streams.',
      node: 'Node.js hosting Socket.io connection pools, broadcasting events, and decoupling I/O.',
    },
    keyFeatures: [
      {
        title: 'Instant One-to-One Messaging',
        description: 'Low-latency direct communication between two users over dedicated socket channels with instant delivery receipts.',
        icon: 'MessageSquare',
      },
      {
        title: 'Multi-User Group Chat Rooms',
        description: 'Configurable group rooms allowing multiple participants to broadcast messages and exchange thoughts simultaneously.',
        icon: 'Users',
      },
      {
        title: 'Live Typing Indicators',
        description: 'Debounced socket events broadcasting user typing activity ("Varma is typing...") with automatic reset timeouts.',
        icon: 'Edit3',
      },
      {
        title: 'JWT-Authenticated WebSockets',
        description: 'Handshake-level authentication validating JWT tokens before granting socket connection and room admittance.',
        icon: 'Shield',
      },
      {
        title: 'Persistent Chat History',
        description: 'Chronological message persistence in MongoDB, enabling infinite scroll history hydration upon entering conversations.',
        icon: 'Archive',
      },
      {
        title: 'Online Presence & Status',
        description: 'Real-time online/offline indicators triggered automatically on socket connection and unexpected disconnection events.',
        icon: 'Wifi',
      },
    ],
    workflows: [
      {
        title: 'Real-Time Connection Lifecycle',
        audience: 'Connected Users',
        steps: [
          'User authenticates via REST API and obtains JWT bearer token.',
          'Client initiates Socket.io connection transmitting token in auth payload.',
          'Server verifies token signature; assigns socket ID to user session map.',
          'Client emits `join_room` event; server assigns socket to room channel.',
          'Real-time messages dispatched via `send_message` and broadcast to peers.',
          'On client disconnect, server updates presence state and notifies room members.',
        ],
      },
    ],
    architectureDiagram: [
      {
        title: 'Client Interface Layer',
        role: 'React Client + Socket.io Client',
        tech: ['React.js', 'Socket.io Client', 'State Reducer'],
        details: [
          'Centralized SocketContext managing connection singleton',
          'Optimistic message rendering for instantaneous local feedback',
          'Auto-scrolling viewports and audio/visual event notifications',
        ],
      },
      {
        title: 'Real-Time Gateway & Event Layer',
        role: 'Node.js & Socket.io Server',
        tech: ['Node.js', 'Socket.io', 'HTTP Server'],
        details: [
          'Handshake middleware verifying JWT token before socket upgrade',
          'Room subscription management (`socket.join`, `socket.to`)',
          'Event multiplexing: `message:send`, `typing:start`, `typing:stop`',
        ],
      },
      {
        title: 'Persistence & Historical Query Layer',
        role: 'MongoDB Document Engine',
        tech: ['MongoDB', 'Mongoose ODM'],
        details: [
          'Asynchronous message persistence without blocking socket thread',
          'Compound indexes on `{ conversationId: 1, timestamp: -1 }`',
          'Cursor-based pagination for rapid scroll-back history retrieval',
        ],
      },
    ],
    databaseDesign: [
      {
        name: 'Message Schema',
        purpose: 'Stores conversational message content, sender details, and timestamps.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique message identifier' },
          { name: 'conversationId', type: 'ObjectId', desc: 'Reference to conversation or room' },
          { name: 'sender', type: 'ObjectId', desc: 'Reference to User document' },
          { name: 'content', type: 'String', desc: 'Encrypted or plain text message string' },
          { name: 'readBy', type: 'Array', desc: 'Array of user IDs who have seen the message' },
          { name: 'createdAt', type: 'Date', desc: 'Chronological timestamp' },
        ],
      },
      {
        name: 'Conversation Schema',
        purpose: 'Defines conversation participants, room metadata, and latest message preview.',
        fields: [
          { name: '_id', type: 'ObjectId', desc: 'Unique room identifier' },
          { name: 'isGroup', type: 'Boolean', desc: 'Flag indicating direct vs group chat' },
          { name: 'name', type: 'String', desc: 'Group name (optional for direct chats)' },
          { name: 'participants', type: 'Array', desc: 'Array of User IDs member to the room' },
          { name: 'latestMessage', type: 'ObjectId', desc: 'Reference to last message sent' },
        ],
      },
    ],
    challenges: [
      {
        problem: 'Socket disconnections caused by flaky network switches leading to ghost user status.',
        solution: 'Implemented heartbeat ping-pong intervals and a disconnect grace period before officially marking a user offline in MongoDB.',
        outcome: 'Eliminated flickering online status indicators and reduced redundant presence broadcasts.',
      },
      {
        problem: 'Writing every message synchronously to MongoDB caused latency spikes under burst chat activity.',
        solution: 'Decoupled socket broadcasting from database writing; emitted socket events immediately to peers while executing asynchronous Mongoose document saves in non-blocking promises.',
        outcome: 'Message round-trip latency reduced to under 40 milliseconds.',
      },
      {
        problem: 'Duplicate message rendering caused by rapid reconnects and re-emitted socket payloads.',
        solution: 'Attached client-generated UUID idempotency keys to each message payload, enabling the React state reducer to discard duplicates.',
        outcome: '100% deduplicated message streams across high-jitter network environments.',
      },
    ],
    previewMockup: {
      gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
      accentColor: '#9575FF',
      badge: 'Real-Time WebSockets',
    },
  },
];
