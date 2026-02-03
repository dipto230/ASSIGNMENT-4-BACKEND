// src/app.ts
import express5 from "express";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String  @id @default(cuid())\n  name          String\n  email         String  @unique\n  emailVerified Boolean @default(false)\n  image         String?\n\n  role   Role       @default(CUSTOMER)\n  status UserStatus @default(ACTIVE)\n  phone  String?\n\n  medicines     Medicine[]\n  orders        Order[]\n  reviews       Review[]\n  cart          CartItem[]\n  orderItems    OrderItem[]\n  refreshTokens RefreshToken[]\n\n  accounts Account[]\n  sessions Session[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique\n  medicines Medicine[]\n}\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String\n  description  String\n  manufacturer String\n  price        Decimal\n  stock        Int\n  image        String?\n  isApproved   Boolean @default(false)\n  isActive     Boolean @default(true)\n\n  approvedBy String?\n  approvedAt DateTime?\n\n  sellerId   String\n  categoryId String\n\n  seller     User        @relation(fields: [sellerId], references: [id])\n  category   Category    @relation(fields: [categoryId], references: [id])\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime   @default(now())\n  updatedAt DateTime   @updatedAt\n  cartItems CartItem[]\n\n  @@index([categoryId])\n  @@index([manufacturer])\n  @@index([price])\n}\n\nmodel CartItem {\n  id         String @id @default(uuid())\n  userId     String\n  medicineId String\n  quantity   Int\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  @@unique([userId, medicineId])\n}\n\nmodel Order {\n  id     String      @id @default(uuid())\n  userId String\n  status OrderStatus @default(PLACED)\n  total  Decimal\n\n  paymentMethod PaymentMethod @default(COD)\n  paymentStatus PaymentStatus @default(PENDING)\n\n  user     User          @relation(fields: [userId], references: [id])\n  items    OrderItem[]\n  shipping ShippingInfo?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel OrderItem {\n  id         String      @id @default(uuid())\n  orderId    String\n  medicineId String\n  sellerId   String\n  quantity   Int\n  price      Decimal\n  status     OrderStatus @default(PLACED)\n\n  order    Order    @relation(fields: [orderId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n  seller   User     @relation(fields: [sellerId], references: [id])\n\n  @@index([sellerId])\n}\n\nmodel ShippingInfo {\n  id         String @id @default(uuid())\n  orderId    String @unique\n  name       String\n  phone      String\n  address    String\n  city       String\n  postalCode String\n  country    String\n\n  order Order @relation(fields: [orderId], references: [id])\n}\n\nmodel Review {\n  id         String  @id @default(uuid())\n  rating     Int\n  comment    String?\n  userId     String\n  medicineId String\n\n  user     User     @relation(fields: [userId], references: [id])\n  medicine Medicine @relation(fields: [medicineId], references: [id])\n\n  @@unique([userId, medicineId])\n}\n\nenum Role {\n  CUSTOMER\n  SELLER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentMethod {\n  COD\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n}\n\nmodel RefreshToken {\n  id        String   @id @default(uuid())\n  token     String   @unique\n  userId    String\n  expiresAt DateTime\n\n  user User @relation(fields: [userId], references: [id])\n\n  createdAt DateTime @default(now())\n}\n\nmodel Account {\n  id         String   @id @default(cuid())\n  userId     String\n  providerId String\n  accountId  String\n  password   String?\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([providerId, accountId])\n}\n\nmodel Session {\n  id        String   @id @default(cuid())\n  token     String   @unique\n  userId    String\n  expiresAt DateTime\n  ipAddress String?\n  userAgent String?\n\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Verification {\n  id         String   @id @default(cuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"MedicineToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"cart","kind":"object","type":"CartItem","relationName":"CartItemToUser"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"OrderItemToUser"},{"name":"refreshTokens","kind":"object","type":"RefreshToken","relationName":"RefreshTokenToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"}],"dbName":null},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"image","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"approvedBy","kind":"scalar","type":"String"},{"name":"approvedAt","kind":"scalar","type":"DateTime"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"seller","kind":"object","type":"User","relationName":"MedicineToUser"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMedicine"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"user","kind":"object","type":"User","relationName":"CartItemToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"CartItemToMedicine"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"total","kind":"scalar","type":"Decimal"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"shipping","kind":"object","type":"ShippingInfo","relationName":"OrderToShippingInfo"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"},{"name":"seller","kind":"object","type":"User","relationName":"OrderItemToUser"}],"dbName":null},"ShippingInfo":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"postalCode","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToShippingInfo"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"}],"dbName":null},"RefreshToken":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"token","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"RefreshTokenToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":null},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"token","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
var auth = betterAuth({
  baseURL: "https://redeploy-medistore.vercel.app",
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [
    "https://medistore-client-side.vercel.app",
    "http://localhost:3000"
  ],
  // ✅ ADD THIS BLOCK (ONLY ADDITION)
  events: {
    async createUser({ user, request }) {
      try {
        const body = await request.json();
        const role = body?.additionalFields?.role === "SELLER" ? "SELLER" : "CUSTOMER";
        await prisma.user.update({
          where: { id: user.id },
          data: { role }
        });
      } catch (error) {
        console.error("Failed to assign role:", error);
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true,
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/"
    }
  }
});

// src/app.ts
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// src/modules/seller/seller.routes.ts
import express from "express";

// src/modules/seller/seller.service.ts
var createMedicine = async (sellerId, data) => {
  if (!data.categoryId) {
    throw new Error("categoryId is required to create a medicine");
  }
  return prisma.medicine.create({
    data: {
      ...data,
      sellerId,
      isApproved: false,
      isActive: true
    }
  });
};
var updateMedicine = async (medicineId, sellerId, data) => {
  return prisma.medicine.updateMany({
    where: { id: medicineId, sellerId },
    data
  });
};
var deleteMedicine = async (medicineId, sellerId) => {
  return prisma.medicine.deleteMany({
    where: { id: medicineId, sellerId }
  });
};
var getSellerMedicines = async (sellerId) => {
  return prisma.medicine.findMany({
    where: { sellerId },
    include: { category: true, reviews: true }
  });
};
var getSellerOrderItems = async (sellerId) => {
  return prisma.orderItem.findMany({
    where: { sellerId },
    include: {
      order: { include: { shipping: true, user: true } },
      medicine: true
    }
  });
};
var updateMainOrderStatus = async (orderId) => {
  const items = await prisma.orderItem.findMany({ where: { orderId } });
  const statuses = items.map((i) => i.status);
  let newStatus = "PLACED";
  if (statuses.every((s) => s === "CANCELLED")) newStatus = "CANCELLED";
  else if (statuses.every((s) => s === "DELIVERED")) newStatus = "DELIVERED";
  else if (statuses.every((s) => s === "SHIPPED")) newStatus = "SHIPPED";
  else if (statuses.some((s) => s === "PROCESSING")) newStatus = "PROCESSING";
  await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus }
  });
};
var updateOrderItemStatus = async (itemId, sellerId, status) => {
  const item = await prisma.orderItem.findFirst({
    where: { id: itemId, sellerId },
    include: { medicine: true }
  });
  if (!item) throw new Error("Order item not found");
  if (status === "PROCESSING" && item.status === "PLACED") {
    if (item.quantity > item.medicine.stock) {
      throw new Error("Stock not available anymore");
    }
    await prisma.medicine.update({
      where: { id: item.medicineId },
      data: { stock: { decrement: item.quantity } }
    });
  }
  const updatedItem = await prisma.orderItem.update({
    where: { id: itemId },
    data: { status }
  });
  await updateMainOrderStatus(item.orderId);
  return updatedItem;
};
var SellerService = {
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getSellerMedicines,
  getSellerOrderItems,
  updateOrderItemStatus
};

// src/modules/seller/seller.controller.ts
var addMedicine = async (req, res) => {
  const medicine = await SellerService.createMedicine(req.user.id, req.body);
  res.status(201).json(medicine);
};
var updateMedicine2 = async (req, res) => {
  const result = await SellerService.updateMedicine(
    String(req.params.id),
    req.user.id,
    req.body
  );
  res.json(result);
};
var deleteMedicine2 = async (req, res) => {
  await SellerService.deleteMedicine(String(req.params.id), req.user.id);
  res.json({ message: "Medicine deleted" });
};
var getMedicines = async (req, res) => {
  const medicines = await SellerService.getSellerMedicines(req.user.id);
  res.json(medicines);
};
var getOrders = async (req, res) => {
  const orders = await SellerService.getSellerOrderItems(req.user.id);
  res.json(orders);
};
var updateOrderStatus = async (req, res) => {
  const item = await SellerService.updateOrderItemStatus(
    String(req.params.itemId),
    req.user.id,
    req.body.status
  );
  res.json(item);
};
var SellerController = {
  addMedicine,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2,
  getMedicines,
  getOrders,
  updateOrderStatus
};

// src/middlewares/auth.middleware.ts
var verifyAuth = async (req, res, next) => {
  console.log("\u27A1\uFE0F verifyAuth hit");
  const cookie = req.headers.cookie;
  console.log("\u{1F36A} Incoming cookie:", cookie);
  if (!cookie) {
    console.log("\u274C No cookie found on request");
    return res.status(401).json({ message: "No cookie" });
  }
  const session = await auth.api.getSession({
    headers: {
      cookie
    }
  });
  console.log("\u{1F9E0} Session result:", session);
  if (!session?.user) {
    console.log("\u274C Session invalid or missing user");
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("\u2705 Authenticated user:", session.user.email);
  req.user = session.user;
  next();
};

// src/middlewares/role.middleware.ts
var verifySeller = (req, res, next) => {
  if (req.user?.role !== "SELLER") {
    return res.status(403).json({ message: "Seller access only" });
  }
  next();
};
var verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// src/modules/seller/seller.routes.ts
var router = express.Router();
router.use(verifyAuth, verifySeller);
router.post("/medicines", SellerController.addMedicine);
router.put("/medicines/:id", SellerController.updateMedicine);
router.delete("/medicines/:id", SellerController.deleteMedicine);
router.get("/medicines", SellerController.getMedicines);
router.get("/orders", SellerController.getOrders);
router.patch("/orders/:itemId/status", SellerController.updateOrderStatus);
var SellerRouter = router;

// src/modules/admin/admin.routes.ts
import express2 from "express";

// src/modules/admin/admin.service.ts
var createCategory = async (data) => {
  return prisma.category.create({ data });
};
var getAllCategories = async () => {
  return prisma.category.findMany();
};
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      image: true,
      emailVerified: true,
      phone: true
    }
  });
};
var updateUserStatus = async (userId, status) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var updateMedicineAvailability = async (medicineId, status) => {
  return prisma.medicine.update({
    where: { id: medicineId },
    data: { isActive: status === "AVAILABLE" }
  });
};
var approveMedicine = async (medicineId, adminId) => {
  return prisma.medicine.update({
    where: { id: medicineId },
    data: {
      isApproved: true,
      approvedBy: adminId,
      approvedAt: /* @__PURE__ */ new Date()
    }
  });
};
var getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: { select: { id: true, name: true, email: true } },
      items: {
        include: {
          medicine: true,
          seller: { select: { id: true, name: true } }
        }
      },
      shipping: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var getAllMedicines = async () => {
  return prisma.medicine.findMany({
    include: {
      category: true,
      seller: {
        select: { id: true, name: true, email: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var AdminService = {
  createCategory,
  getAllCategories,
  getAllUsers,
  updateUserStatus,
  approveMedicine,
  updateMedicineAvailability,
  getAllOrders,
  getAllMedicines
};

// src/modules/admin/admin.controller.ts
var addCategory = async (req, res) => {
  try {
    const category = await AdminService.createCategory(req.body);
    res.status(201).json(category);
  } catch (e) {
    res.status(400).json({ error: "Failed to create category", details: e });
  }
};
var getCategories = async (req, res) => {
  try {
    const categories = await AdminService.getAllCategories();
    res.json(categories);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch categories", details: e });
  }
};
var getUsers = async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json(users);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch users", details: e });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["ACTIVE", "BANNED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const user = await AdminService.updateUserStatus(String(req.params.id), status);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: "Failed to update user status", details: e });
  }
};
var updateMedicineAvailability2 = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["AVAILABLE", "UNAVAILABLE"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const medicine = await AdminService.updateMedicineAvailability(
      String(req.params.id),
      status
    );
    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to update availability", details: e });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const orders = await AdminService.getAllOrders();
    res.json(orders);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch orders", details: e });
  }
};
var getAllMedicines2 = async (_req, res) => {
  try {
    const medicines = await AdminService.getAllMedicines();
    res.json(medicines);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicines", details: e });
  }
};
var approveMedicine2 = async (req, res) => {
  try {
    const medicine = await AdminService.approveMedicine(
      String(req.params.id),
      req.user.id
      // admin id
    );
    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to approve medicine", details: e });
  }
};
var AdminController = {
  addCategory,
  getCategories,
  getUsers,
  updateUserStatus: updateUserStatus2,
  approveMedicine: approveMedicine2,
  updateMedicineAvailability: updateMedicineAvailability2,
  getAllOrders: getAllOrders2,
  getAllMedicines: getAllMedicines2
};

// src/modules/admin/admin.routes.ts
var router2 = express2.Router();
router2.use(verifyAuth, verifyAdmin);
router2.post("/categories", AdminController.addCategory);
router2.get("/categories", AdminController.getCategories);
router2.get("/users", AdminController.getUsers);
router2.patch("/users/:id/status", AdminController.updateUserStatus);
router2.patch("/medicines/:id/availability", AdminController.updateMedicineAvailability);
router2.get("/orders", AdminController.getAllOrders);
router2.get("/medicines", AdminController.getAllMedicines);
router2.patch("/medicines/:id/approve", AdminController.approveMedicine);
var AdminRouter = router2;

// src/modules/public/public.routes.ts
import express3 from "express";

// src/modules/public/public.service.ts
var getMedicines2 = async (filters) => {
  const where = {
    isActive: true,
    isApproved: true
  };
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.manufacturer) where.manufacturer = { contains: filters.manufacturer, mode: "insensitive" };
  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.gte = filters.minPrice;
    if (filters.maxPrice) where.price.lte = filters.maxPrice;
  }
  return prisma.medicine.findMany({
    where,
    include: { category: true, reviews: true },
    orderBy: { createdAt: "desc" }
  });
};
var getMedicineById = async (id) => {
  return prisma.medicine.findFirst({
    where: { id, isActive: true, isApproved: true },
    include: { category: true, reviews: { include: { user: { select: { name: true } } } } }
  });
};
var getCategories2 = async () => {
  return prisma.category.findMany({
    include: { medicines: { where: { isActive: true, isApproved: true } } }
  });
};
var PublicService = {
  getMedicines: getMedicines2,
  getMedicineById,
  getCategories: getCategories2
};

// src/modules/public/public.controller.ts
var getMedicines3 = async (req, res) => {
  try {
    const { categoryId, manufacturer, minPrice, maxPrice } = req.query;
    const medicines = await PublicService.getMedicines({
      categoryId,
      manufacturer,
      minPrice: minPrice ? Number(minPrice) : void 0,
      maxPrice: maxPrice ? Number(maxPrice) : void 0
    });
    res.json(medicines);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicines", details: e });
  }
};
var getMedicineById2 = async (req, res) => {
  try {
    const medicine = await PublicService.getMedicineById(String(req.params.id));
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json(medicine);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch medicine", details: e });
  }
};
var getCategories3 = async (_req, res) => {
  try {
    const categories = await PublicService.getCategories();
    res.json(categories);
  } catch (e) {
    res.status(400).json({ error: "Failed to fetch categories", details: e });
  }
};
var PublicController = {
  getMedicines: getMedicines3,
  getMedicineById: getMedicineById2,
  getCategories: getCategories3
};

// src/modules/public/public.routes.ts
var router3 = express3.Router();
router3.get("/medicines", PublicController.getMedicines);
router3.get("/medicines/:id", PublicController.getMedicineById);
router3.get("/categories", PublicController.getCategories);
var PublicRouter = router3;

// src/customer/customer.routes.ts
import express4 from "express";

// src/customer/customer.service.ts
var CustomerService = {
  getCart: async (userId) => {
    return prisma.cartItem.findMany({
      where: { userId },
      include: { medicine: true }
    });
  },
  addToCart: async (userId, medicineId, quantity) => {
    return prisma.cartItem.upsert({
      where: { userId_medicineId: { userId, medicineId } },
      update: { quantity },
      create: { userId, medicineId, quantity }
    });
  },
  updateCartItem: async (cartItemId, userId, quantity) => {
    return prisma.cartItem.updateMany({
      where: { id: cartItemId, userId },
      data: { quantity }
    });
  },
  removeCartItem: async (cartItemId, userId) => {
    return prisma.cartItem.deleteMany({
      where: { id: cartItemId, userId }
    });
  },
  placeOrder: async (userId, shipping, paymentMethod = "COD") => {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { medicine: true }
    });
    if (cartItems.length === 0) throw new Error("Cart is empty");
    for (const item of cartItems) {
      if (!item.medicine.isActive || !item.medicine.isApproved) {
        throw new Error(`${item.medicine.name} is not available`);
      }
      if (item.quantity > item.medicine.stock) {
        throw new Error(`Not enough stock for ${item.medicine.name}`);
      }
    }
    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.medicine.price) * item.quantity,
      0
    );
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        paymentMethod,
        paymentStatus: "PENDING",
        status: "PLACED",
        items: {
          create: cartItems.map((item) => ({
            medicineId: item.medicineId,
            sellerId: item.medicine.sellerId,
            quantity: item.quantity,
            price: item.medicine.price,
            status: "PLACED"
          }))
        },
        shipping: { create: shipping }
      },
      include: { items: true, shipping: true }
    });
    await prisma.cartItem.deleteMany({ where: { userId } });
    return order;
  },
  getOrders: async (userId) => {
    return prisma.order.findMany({
      where: { userId },
      include: { items: { include: { medicine: true } }, shipping: true },
      orderBy: { createdAt: "desc" }
    });
  },
  getOrderById: async (orderId, userId) => {
    return prisma.order.findFirst({
      where: { id: orderId, userId },
      include: { items: { include: { medicine: true } }, shipping: true }
    });
  },
  addReview: async (userId, medicineId, rating, comment) => {
    const orders = await prisma.orderItem.findMany({
      where: { sellerId: userId, medicineId }
    });
    return prisma.review.create({
      data: { userId, medicineId, rating, comment: comment ?? null }
    });
  },
  updateProfile: async (userId, data) => {
    return prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true
      }
    });
  },
  getProfile: async (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true
      }
    });
  }
};

// src/customer/customer.controller.ts
var getCart = async (req, res) => {
  try {
    const cart = await CustomerService.getCart(req.user.id);
    res.json(cart);
  } catch (e) {
    res.status(400).json({ error: "Failed to get cart", details: e });
  }
};
var addToCart = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;
    const cartItem = await CustomerService.addToCart(req.user.id, medicineId, quantity);
    res.status(201).json(cartItem);
  } catch (e) {
    res.status(400).json({ error: "Failed to add to cart", details: e });
  }
};
var updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CustomerService.updateCartItem(String(req.params.cartItemId), req.user.id, quantity);
    res.json(cartItem);
  } catch (e) {
    res.status(400).json({ error: "Failed to update cart item", details: e });
  }
};
var removeCartItem = async (req, res) => {
  try {
    await CustomerService.removeCartItem(String(req.params.cartItemId), req.user.id);
    res.json({ message: "Item removed from cart" });
  } catch (e) {
    res.status(400).json({ error: "Failed to remove cart item", details: e });
  }
};
var placeOrder = async (req, res) => {
  try {
    const { shipping, paymentMethod } = req.body;
    const order = await CustomerService.placeOrder(req.user.id, shipping, paymentMethod);
    res.status(201).json(order);
  } catch (e) {
    res.status(400).json({ error: "Failed to place order", details: e });
  }
};
var getOrders2 = async (req, res) => {
  try {
    const orders = await CustomerService.getOrders(req.user.id);
    res.json(orders);
  } catch (e) {
    res.status(400).json({ error: "Failed to get orders", details: e });
  }
};
var getOrderById = async (req, res) => {
  try {
    const order = await CustomerService.getOrderById(String(req.params.id), req.user.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: "Failed to get order", details: e });
  }
};
var addReview = async (req, res) => {
  try {
    const { medicineId, rating, comment } = req.body;
    const review = await CustomerService.addReview(req.user.id, medicineId, rating, comment);
    res.status(201).json(review);
  } catch (e) {
    res.status(400).json({ error: "Failed to add review", details: e });
  }
};
var updateProfile = async (req, res) => {
  try {
    const user = await CustomerService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: "Failed to update profile", details: e });
  }
};
var getProfile = async (req, res) => {
  try {
    const user = await CustomerService.getProfile(req.user.id);
    res.json({
      success: true,
      message: "Profile fetched successfully",
      data: user
    });
  } catch (e) {
    res.status(400).json({ success: false, message: "Failed to fetch profile", details: e });
  }
};
var CustomerController = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  placeOrder,
  getOrders: getOrders2,
  getOrderById,
  addReview,
  updateProfile,
  getProfile
};

// src/customer/customer.routes.ts
var router4 = express4.Router();
router4.use(verifyAuth);
router4.get("/cart", CustomerController.getCart);
router4.post("/cart", CustomerController.addToCart);
router4.patch("/cart/:cartItemId", CustomerController.updateCartItem);
router4.delete("/cart/:cartItemId", CustomerController.removeCartItem);
router4.post("/orders", CustomerController.placeOrder);
router4.get("/orders", CustomerController.getOrders);
router4.get("/orders/:id", CustomerController.getOrderById);
router4.get("/profile", CustomerController.getProfile);
router4.patch("/profile", CustomerController.updateProfile);
router4.post("/reviews", CustomerController.addReview);
var CustomerRouter = router4;

// src/app.ts
var app = express5();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express5.json());
app.use(cookieParser());
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL || "https://medistore-client-side.vercel.app"
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/medistore-client-side.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.get("/", (_req, res) => {
  res.status(200).send("Hello Assignment 4 \u{1F680}");
});
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api", PublicRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/admin", AdminRouter);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Server error"
  });
});
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully..");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("An error occurred", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
var server_default = app_default;
export {
  server_default as default
};
