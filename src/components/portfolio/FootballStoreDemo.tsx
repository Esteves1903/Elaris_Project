"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Heart, Trophy, ArrowLeft, CheckCircle2,
  ShoppingBag, ShoppingBasket, Plus, Minus, Trash2,
} from "lucide-react";

type Lang = "en" | "pt";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`text-xs ${s<=Math.round(rating) ? 'text-amber-400' : 'text-zinc-300'}`}>â˜…</span>
      ))}
    </span>
  );
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  brand: string;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  sizes: string[];
  description: string;
}
interface CartItem extends Product { quantity: number; selectedSize: string; }

export function FootballStoreDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const t = {
    en: {
      performanceStore: "Performance Store", searchPlaceholder: "Searchâ€¦", cart: "Cart",
      catAll: "All", catBoots: "Boots", catKits: "Kits", catBalls: "Balls",
      catGoalkeeper: "Goalkeeper", catTraining: "Training", catAccessories: "Accessories",
      heroTitle1: "PLAY AT YOUR", heroTitle2: "PEAK.",
      shopBoots: "Shop Boots", shopKits: "Shop Kits", onBoots: "on boots",
      products: "products", featured: "Featured", priceLow: "Price: Low â†’ High", priceHigh: "Price: High â†’ Low",
      noProducts: "No products found for", backToShop: "Back to Shop", reviews: "reviews",
      selectSize: "Select Size", pleaseSelectSize: "Please select a size",
      addToCart: "Add to Cart", yourCart: "Your Cart", continueShopping: "Continue Shopping",
      cartEmpty: "Your cart is empty", cartEmptySub: "Add some gear to get started",
      browseProducts: "Browse Products", subtotal: "Subtotal", savings: "Savings",
      shipping: "Shipping", free: "Free", addMore: "Add", moreForFree: "more for free shipping!",
      total: "Total", checkout: "Checkout",
      shippingPayment: "Shipping & Payment", fullName: "Full Name", email: "Email Address",
      address: "Shipping Address", card: "Card Number", placeOrder: "Place Order",
      order: "Order", items: "items", orderConfirmed: "Order Confirmed",
      thankYou: "Thank you,", confirmation: "Your order has been confirmed. A confirmation has been sent to",
      yourEmail: "your email", estDelivery: "Estimated delivery:", deliveryDays: "3â€“5 business days",
      backToStore: "Back to Store", size: "Size", each: "each",
      errName: "Required", errEmail: "Invalid email", errAddress: "Required", errCard: "Enter a valid card number",
      orderSummary: "Order Summary", backToCart: "Back to Cart",
      prod1_d: "Elite football boots engineered for total control. Laceless design with Primeknit upper for a sock-like fit and explosive first touch.",
      prod2_d: "Designed for pure speed. The ultra-thin Flyknit upper delivers a barefoot feel while the carbon fibre soleplate maximises energy return.",
      prod3_d: "The official Portugal 2024 home jersey. Sweat-wicking Dri-FIT ADV technology keeps you cool and dry during the most intense moments.",
      prod4_d: "The official match ball of the UEFA Champions League. Thermally bonded panels and a butyl bladder for consistent flight and touch.",
      prod5_d: "Professional-grade goalkeeper gloves with NC Excellent 3mm latex palm. Exceptional grip in all weather conditions.",
      prod6_d: "The France 2024 away kit featuring a stunning navy gradient design. Official Dri-FIT ADV technology for peak performance.",
      prod7_d: "Durable 32-panel training ball with a butyl inner tube for consistent bounce and shape retention through thousands of kicks.",
      prod8_d: "Nike's most precise boot ever. Textured touch zone and split outsole geometry for explosive multi-directional movement.",
      prod9_d: "Full compression top and shorts set with Dri-FIT technology. Designed to support muscles and enhance recovery during training.",
      prod10_d: "50-piece set of high-visibility training cones. Lightweight, stackable and perfect for agility drills and pitch marking.",
      prod11_d: "Lightweight EVA foam shin guards with anatomical shape. Ankle protection straps included for a secure, comfortable fit.",
      prod12_d: "Professional goalkeeper jersey with padded elbows for diving protection. Ultra-breathable mesh panels for maximum ventilation.",
    },
    pt: {
      performanceStore: "Loja de Performance", searchPlaceholder: "Pesquisarâ€¦", cart: "Carrinho",
      catAll: "Todos", catBoots: "Chuteiras", catKits: "Equipamentos", catBalls: "Bolas",
      catGoalkeeper: "Guarda-Redes", catTraining: "Treino", catAccessories: "AcessÃ³rios",
      heroTitle1: "JOGA NO TEU", heroTitle2: "MELHOR.",
      shopBoots: "Ver Chuteiras", shopKits: "Ver Equipamentos", onBoots: "nas chuteiras",
      products: "produtos", featured: "Destaques", priceLow: "PreÃ§o: Mais Baixo", priceHigh: "PreÃ§o: Mais Alto",
      noProducts: "Nenhum produto encontrado para", backToShop: "Voltar Ã  Loja", reviews: "avaliaÃ§Ãµes",
      selectSize: "Selecionar Tamanho", pleaseSelectSize: "Por favor seleciona um tamanho",
      addToCart: "Adicionar ao Carrinho", yourCart: "O Teu Carrinho", continueShopping: "Continuar a Comprar",
      cartEmpty: "O teu carrinho estÃ¡ vazio", cartEmptySub: "Adiciona equipamento para comeÃ§ar",
      browseProducts: "Ver Produtos", subtotal: "Subtotal", savings: "PoupanÃ§a",
      shipping: "Envio", free: "GrÃ¡tis", addMore: "Adiciona", moreForFree: "mais para envio grÃ¡tis!",
      total: "Total", checkout: "Finalizar",
      shippingPayment: "Envio & Pagamento", fullName: "Nome Completo", email: "Email",
      address: "Morada de Envio", card: "NÃºmero de CartÃ£o", placeOrder: "Fazer Encomenda",
      order: "Encomenda", items: "artigos", orderConfirmed: "Encomenda Confirmada",
      thankYou: "Obrigado,", confirmation: "A tua encomenda foi confirmada. Foi enviada confirmaÃ§Ã£o para",
      yourEmail: "o teu email", estDelivery: "Entrega estimada:", deliveryDays: "3â€“5 dias Ãºteis",
      backToStore: "Voltar Ã  Loja", size: "Tamanho", each: "cada",
      errName: "ObrigatÃ³rio", errEmail: "Email invÃ¡lido", errAddress: "ObrigatÃ³rio", errCard: "NÃºmero de cartÃ£o invÃ¡lido",
      orderSummary: "Resumo da Encomenda", backToCart: "Voltar ao Carrinho",
      prod1_d: "Chuteiras de elite para controlo total. Design sem atacadores com parte superior Primeknit para um ajuste perfeito e primeiro toque explosivo.",
      prod2_d: "Concebidas para velocidade pura. A parte superior ultra-fina Flyknit oferece uma sensaÃ§Ã£o descalÃ§o enquanto a sola de fibra de carbono maximiza o retorno de energia.",
      prod3_d: "A camisola oficial de Portugal para o Euro 2024. Tecnologia Dri-FIT ADV com absorÃ§Ã£o de suor mantÃ©m-te fresco durante os momentos mais intensos.",
      prod4_d: "A bola de jogo oficial da UEFA Champions League. PainÃ©is termicamente colados e bexiga de butilo para voo e toque consistentes.",
      prod5_d: "Luvas de guarda-redes profissionais com palma de lÃ¡tex NC Excellent 3mm. AderÃªncia excecional em todas as condiÃ§Ãµes climatÃ©ricas.",
      prod6_d: "O equipamento alternativo da FranÃ§a 2024 com um deslumbrante degradÃª azul-marinho. Tecnologia oficial Dri-FIT ADV para desempenho mÃ¡ximo.",
      prod7_d: "Bola de treino durÃ¡vel com 32 painÃ©is e cÃ¢mara de ar de butilo para ressalto consistente e retenÃ§Ã£o de forma apÃ³s milhares de remates.",
      prod8_d: "A bota mais precisa da Nike. Zona de toque texturizada e geometria de sola dividida para movimentos multidirecionais explosivos.",
      prod9_d: "Kit completo de compressÃ£o com calÃ§Ãµes e camisola com tecnologia Dri-FIT. Concebido para suporte muscular e recuperaÃ§Ã£o durante o treino.",
      prod10_d: "Conjunto de 50 cones de treino de alta visibilidade. Leves, empilhÃ¡veis e perfeitos para drills de agilidade e marcaÃ§Ã£o de campo.",
      prod11_d: "Caneleiras leves de espuma EVA com forma anatÃ³mica. Inclui tiras de proteÃ§Ã£o do tornozelo para um ajuste seguro e confortÃ¡vel.",
      prod12_d: "Camisola profissional de guarda-redes com cotoveleiras acolchoadas para proteÃ§Ã£o nas mergulhadas. PainÃ©is de malha ultra-respirÃ¡vel para ventilaÃ§Ã£o mÃ¡xima.",
    },
  }[lang] ?? {
    performanceStore: "Performance Store", searchPlaceholder: "Searchâ€¦", cart: "Cart",
    catAll: "All", catBoots: "Boots", catKits: "Kits", catBalls: "Balls",
    catGoalkeeper: "Goalkeeper", catTraining: "Training", catAccessories: "Accessories",
    heroTitle1: "PLAY AT YOUR", heroTitle2: "PEAK.",
    shopBoots: "Shop Boots", shopKits: "Shop Kits", onBoots: "on boots",
    products: "products", featured: "Featured", priceLow: "Price: Low â†’ High", priceHigh: "Price: High â†’ Low",
    noProducts: "No products found for", backToShop: "Back to Shop", reviews: "reviews",
    selectSize: "Select Size", pleaseSelectSize: "Please select a size",
    addToCart: "Add to Cart", yourCart: "Your Cart", continueShopping: "Continue Shopping",
    cartEmpty: "Your cart is empty", cartEmptySub: "Add some gear to get started",
    browseProducts: "Browse Products", subtotal: "Subtotal", savings: "Savings",
    shipping: "Shipping", free: "Free", addMore: "Add", moreForFree: "more for free shipping!",
    total: "Total", checkout: "Checkout",
    shippingPayment: "Shipping & Payment", fullName: "Full Name", email: "Email Address",
    address: "Shipping Address", card: "Card Number", placeOrder: "Place Order",
    order: "Order", items: "items", orderConfirmed: "Order Confirmed",
    thankYou: "Thank you,", confirmation: "Your order has been confirmed. A confirmation has been sent to",
    yourEmail: "your email", estDelivery: "Estimated delivery:", deliveryDays: "3â€“5 business days",
    backToStore: "Back to Store", size: "Size", each: "each",
    errName: "Required", errEmail: "Invalid email", errAddress: "Required", errCard: "Enter a valid card number",
    orderSummary: "Order Summary", backToCart: "Back to Cart",
    prod1_d: "Elite football boots engineered for total control. Laceless design with Primeknit upper for a sock-like fit and explosive first touch.",
    prod2_d: "Designed for pure speed. The ultra-thin Flyknit upper delivers a barefoot feel while the carbon fibre soleplate maximises energy return.",
    prod3_d: "The official Portugal 2024 home jersey. Sweat-wicking Dri-FIT ADV technology keeps you cool and dry during the most intense moments.",
    prod4_d: "The official match ball of the UEFA Champions League. Thermally bonded panels and a butyl bladder for consistent flight and touch.",
    prod5_d: "Professional-grade goalkeeper gloves with NC Excellent 3mm latex palm. Exceptional grip in all weather conditions.",
    prod6_d: "The France 2024 away kit featuring a stunning navy gradient design. Official Dri-FIT ADV technology for peak performance.",
    prod7_d: "Durable 32-panel training ball with a butyl inner tube for consistent bounce and shape retention through thousands of kicks.",
    prod8_d: "Nike's most precise boot ever. Textured touch zone and split outsole geometry for explosive multi-directional movement.",
    prod9_d: "Full compression top and shorts set with Dri-FIT technology. Designed to support muscles and enhance recovery during training.",
    prod10_d: "50-piece set of high-visibility training cones. Lightweight, stackable and perfect for agility drills and pitch marking.",
    prod11_d: "Lightweight EVA foam shin guards with anatomical shape. Ankle protection straps included for a secure, comfortable fit.",
    prod12_d: "Professional goalkeeper jersey with padded elbows for diving protection. Ultra-breathable mesh panels for maximum ventilation.",
  };

  const [view, setView] = useState<'shop'|'product'|'cart'|'checkout'|'success'>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [sortBy, setSortBy] = useState<'featured'|'price-asc'|'price-desc'>('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [checkoutForm, setCheckoutForm] = useState({ name:'', email:'', address:'', card:'' });
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string,string>>({});
  const [addedId, setAddedId] = useState<number|null>(null);

  const products: Product[] = [
    { id:1, name:"Predator Elite FG", price:250, originalPrice:320, brand:"Adidas", category:"Boots",
      badge:"Sale", rating:4.8, reviews:312, sizes:["39","40","41","42","43","44","45"], description: t.prod1_d, image:"/Pedradator.webp" },
    { id:2, name:"Mercurial Vapor 16 Elite", price:275, brand:"Nike", category:"Boots",
      badge:"New", rating:4.9, reviews:198, sizes:["38","39","40","41","42","43","44"], description: t.prod2_d, image:"/Mercurial.webp" },
    { id:3, name:"Portugal 24 Home Kit", price:140, brand:"Nike", category:"Kits",
      badge:"Hot", rating:4.7, reviews:540, sizes:["XS","S","M","L","XL","XXL"], description: t.prod3_d, image:"/Portugalkit.webp" },
    { id:4, name:"UCL Pro Ball", price:165, brand:"Adidas", category:"Balls",
      rating:4.6, reviews:87, sizes:["Size 4","Size 5"], description: t.prod4_d, image:"/UCLBola.webp" },
    { id:5, name:"Phantom GK Elite", price:95, brand:"Reusch", category:"Goalkeeper",
      rating:4.5, reviews:63, sizes:["7","8","9","10","11"], description: t.prod5_d, image:"/luvas.webp" },
    { id:6, name:"France Away Kit", price:130, originalPrice:150, brand:"Nike", category:"Kits",
      badge:"Sale", rating:4.4, reviews:221, sizes:["XS","S","M","L","XL","XXL"], description: t.prod6_d, image:"/Francefora.webp" },
    { id:7, name:"Pro Training Ball", price:45, brand:"Adidas", category:"Balls",
      rating:4.3, reviews:145, sizes:["Size 4","Size 5"], description: t.prod7_d, image:"/bolatreino.webp" },
    { id:8, name:"Phantom Luna Elite FG", price:230, brand:"Nike", category:"Boots",
      badge:"New", rating:4.8, reviews:76, sizes:["36","37","38","39","40","41","42"], description: t.prod8_d, image:"/luna.webp" },
    { id:9, name:"Training Compression Set", price:75, brand:"Nike", category:"Training",
      rating:4.5, reviews:189, sizes:["S","M","L","XL"], description: t.prod9_d, image:"/kittreino.webp" },
    { id:10, name:"Speed Training Cones Set", price:25, brand:"Generic", category:"Training",
      rating:4.2, reviews:302, sizes:["One Size"], description: t.prod10_d, image:"/cones.webp" },
    { id:11, name:"Elite Shin Guards", price:55, brand:"Adidas", category:"Accessories",
      rating:4.6, reviews:93, sizes:["S","M","L","XL"], description: t.prod11_d, image:"/caneleira.webp" },
    { id:12, name:"Goalkeeper Jersey Pro", price:85, brand:"Reusch", category:"Goalkeeper",
      rating:4.3, reviews:41, sizes:["S","M","L","XL","XXL"], description: t.prod12_d, image:"/gredes.webp" },
  ];

  const categories = ['All','Boots','Kits','Balls','Goalkeeper','Training','Accessories'];
  const categoryLabels: Record<string, string> = {
    All: t.catAll, Boots: t.catBoots, Kits: t.catKits, Balls: t.catBalls,
    Goalkeeper: t.catGoalkeeper, Training: t.catTraining, Accessories: t.catAccessories,
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.selectedSize}` === key ? {...i, quantity: i.quantity+1} : i);
      return [...prev, {...product, quantity:1, selectedSize:size}];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id: number, size: string) =>
    setCart(prev => prev.filter(i => !(i.id===id && i.selectedSize===size)));

  const updateQuantity = (id: number, size: string, delta: number) =>
    setCart(prev => prev.map(i => i.id===id && i.selectedSize===size
      ? {...i, quantity: Math.max(1, i.quantity+delta)} : i));

  const toggleWishlist = (id: number) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  const total = cart.reduce((acc,i) => acc + i.price * i.quantity, 0);
  const cartCount = cart.reduce((acc,i) => acc + i.quantity, 0);
  const savings = cart.reduce((acc,i) => acc + ((i.originalPrice||i.price)-i.price)*i.quantity, 0);

  const filtered = products
    .filter(p => selectedCategory==='All' || p.category===selectedCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortBy==='price-asc' ? a.price-b.price : sortBy==='price-desc' ? b.price-a.price : 0);

  const validateCheckout = () => {
    const e: Record<string,string> = {};
    if (!checkoutForm.name.trim()) e.name = t.errName;
    if (!checkoutForm.email.includes('@')) e.email = t.errEmail;
    if (!checkoutForm.address.trim()) e.address = t.errAddress;
    if (checkoutForm.card.replace(/\s/g,'').length < 16) e.card = t.errCard;
    return e;
  };

  return (
    <div className="h-full flex flex-col bg-[#f8f9fb] text-[#111] relative font-sans">

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <nav className="bg-white border-b border-zinc-200 px-4 md:px-8 py-3 flex items-center gap-4 z-40 shrink-0">
        <div onClick={()=>{setView('shop');setSearch('');}} className="flex items-center gap-2.5 cursor-pointer mr-2 shrink-0">
          <div className="bg-black p-1.5 rounded-lg"><Trophy size={18} className="text-white"/></div>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none">HELARYS<span className="text-[#0066ff]">SPORT</span></h1>
            <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-400 font-bold">{t.performanceStore}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 flex-1">
          {categories.map(cat => (
            <button key={cat} onClick={()=>setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedCategory===cat ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-500'}`}>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-zinc-100 rounded-full px-3 py-2 w-[120px] md:w-[200px] ml-auto">
          <Search size={14} className="text-zinc-400 shrink-0"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPlaceholder}
            className="bg-transparent outline-none px-2 text-xs w-full"/>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-[#0066ff] text-white border-[#0066ff]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>EN</button>
          <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-[#0066ff] text-white border-[#0066ff]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>PT</button>
        </div>

        <button onClick={()=>{}} className="relative p-2">
          <Heart size={20} className="text-zinc-500"/>
          {wishlist.length>0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
        </button>

        <button onClick={()=>setView('cart')} className="relative flex items-center gap-2 bg-black hover:bg-[#0066ff] text-white px-4 py-2 rounded-full transition-all text-xs font-black uppercase tracking-widest shrink-0">
          <ShoppingBag size={16}/>
          <span className="hidden sm:block">{t.cart}</span>
          {cartCount>0 && <span className="absolute -top-2 -right-2 bg-[#0066ff] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
        </button>
      </nav>

      {/* â”€â”€ MAIN CONTENT â”€â”€ */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <AnimatePresence mode="wait">

          {/* SHOP */}
          {view==='shop' && (
            <motion.div key="shop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>

              <div className="relative h-[200px] bg-black overflow-hidden">
                <img src="/lojafundo.webp" className="absolute inset-0 w-full h-full object-cover opacity-50"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"/>
                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 text-white">
                  <h2 className="text-1xl md:text-2xl font-black leading-tight mb-5">
                    {t.heroTitle1}<br/>
                    <span className="text-[#0066ff]">{t.heroTitle2}</span>
                  </h2>
                  <div className="flex gap-3">
                    <button onClick={()=>setSelectedCategory('Boots')} className="px-6 py-2.5 bg-[#0066ff] hover:bg-white hover:text-black text-white font-black text-[10px] uppercase tracking-widest rounded-full transition-all">
                      {t.shopBoots}
                    </button>
                    <button onClick={()=>setSelectedCategory('Kits')} className="px-6 py-2.5 border border-white/40 hover:bg-white hover:text-black text-white font-black text-[10px] uppercase tracking-widest rounded-full transition-all">
                      {t.shopKits}
                    </button>
                  </div>
                </div>
                <div className="absolute top-6 right-8 bg-red-600 text-white px-4 py-2 rounded-xl text-center shadow-xl">
                  <div className="text-xl font-black leading-none">-20%</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold">{t.onBoots}</div>
                </div>
              </div>

              <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-3 sticky top-0 z-20">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map(cat => (
                    <button key={cat} onClick={()=>setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all shrink-0 ${selectedCategory===cat ? 'bg-black text-white' : 'bg-zinc-100'}`}>
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                <p className="text-xs text-zinc-400 font-bold">{filtered.length} {t.products}</p>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                  className="text-xs bg-white border border-zinc-200 rounded-lg px-3 py-2 outline-none font-bold cursor-pointer">
                  <option value="featured">{t.featured}</option>
                  <option value="price-asc">{t.priceLow}</option>
                  <option value="price-desc">{t.priceHigh}</option>
                </select>
              </div>

              <div className="px-6 md:px-10 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.length===0 && (
                  <div className="col-span-4 text-center py-20 text-zinc-400">
                    <Search size={40} className="mx-auto mb-4 opacity-30"/>
                    <p className="font-bold">{t.noProducts} &quot;{search}&quot;</p>
                  </div>
                )}
                {filtered.map(item => (
                  <motion.div key={item.id} whileHover={{y:-4}} transition={{duration:0.2}}
                    className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#0066ff]/30 hover:shadow-xl transition-all group cursor-pointer"
                    onClick={()=>{setSelectedProduct(item);setSelectedSize('');setSizeError(false);setView('product');}}>
                    <div className="relative h-52 bg-zinc-50 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      {item.badge && (
                        <span className={`absolute top-2 left-2 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${item.badge==='Sale'?'bg-red-500':item.badge==='New'?'bg-[#0066ff]':'bg-amber-500'}`}>
                          {item.badge}
                        </span>
                      )}
                      <button onClick={e=>{e.stopPropagation();toggleWishlist(item.id);}}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow transition-all hover:scale-110">
                        <Heart size={14} className={wishlist.includes(item.id) ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}/>
                      </button>
                      {addedId===item.id && (
                        <div className="absolute inset-0 bg-[#0066ff]/90 flex items-center justify-center">
                          <CheckCircle2 size={40} className="text-white"/>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#0066ff] mb-2">{item.brand} Â· {item.category}</p>
                      <h4 className="font-black text-sm leading-snug mb-3 min-h-[36px]">{item.name}</h4>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Stars rating={item.rating}/>
                        <span className="text-[10px] text-zinc-400">({item.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black">â‚¬{item.price}</span>
                          {item.originalPrice && <span className="text-xs text-zinc-400 line-through ml-1">â‚¬{item.originalPrice}</span>}
                        </div>
                        <button onClick={e=>{e.stopPropagation();if(item.sizes.length===1){addToCart(item,item.sizes[0]);}else{setSelectedProduct(item);setSelectedSize('');setSizeError(false);setView('product');}}}
                          className="w-8 h-8 bg-black hover:bg-[#0066ff] text-white rounded-xl flex items-center justify-center transition-all">
                          <Plus size={16}/>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PRODUCT DETAIL */}
          {view==='product' && selectedProduct && (
            <motion.div key="product" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-5xl mx-auto">
              <button onClick={()=>setView('shop')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={16}/> {t.backToShop}
              </button>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-zinc-100 rounded-3xl overflow-hidden h-[380px]">
                  <img src={selectedProduct.image} className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col justify-center">
                  {selectedProduct.badge && (
                    <span className={`self-start text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 ${selectedProduct.badge==='Sale'?'bg-red-500':selectedProduct.badge==='New'?'bg-[#0066ff]':'bg-amber-500'}`}>
                      {selectedProduct.badge}
                    </span>
                  )}
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0066ff] mb-2">{selectedProduct.brand} Â· {selectedProduct.category}</p>
                  <h2 className="text-3xl font-black mb-3">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars rating={selectedProduct.rating}/>
                    <span className="text-xs text-zinc-500">{selectedProduct.rating} Â· {selectedProduct.reviews} {t.reviews}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black">â‚¬{selectedProduct.price}</span>
                    {selectedProduct.originalPrice && <>
                      <span className="text-lg text-zinc-400 line-through">â‚¬{selectedProduct.originalPrice}</span>
                      <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-0.5 rounded-full">-{Math.round((1-selectedProduct.price/selectedProduct.originalPrice)*100)}%</span>
                    </>}
                  </div>
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                      {t.selectSize}
                      {sizeError && <span className="text-red-500 normal-case font-normal">{t.pleaseSelectSize}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(s => (
                        <button key={s} onClick={()=>{setSelectedSize(s);setSizeError(false);}}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${selectedSize===s ? 'bg-black text-white border-black' : 'border-zinc-200 hover:border-black'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>{
                      if(!selectedSize){setSizeError(true);return;}
                      addToCart(selectedProduct, selectedSize);
                      setView('shop');
                    }} className="flex-1 py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-2">
                      <ShoppingBag size={16}/> {t.addToCart}
                    </button>
                    <button onClick={()=>toggleWishlist(selectedProduct.id)}
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${wishlist.includes(selectedProduct.id) ? 'border-rose-500 bg-rose-50' : 'border-zinc-200 hover:border-rose-400'}`}>
                      <Heart size={20} className={wishlist.includes(selectedProduct.id) ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}/>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CART */}
          {view==='cart' && (
            <motion.div key="cart" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black">{t.yourCart} <span className="text-zinc-300 text-2xl">({cartCount})</span></h2>
                <button onClick={()=>setView('shop')} className="text-xs font-black uppercase tracking-widest text-[#0066ff] flex items-center gap-1 hover:gap-2 transition-all">
                  <ArrowLeft size={14}/> {t.continueShopping}
                </button>
              </div>
              {cart.length===0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-zinc-200">
                  <ShoppingBasket size={52} className="mx-auto text-zinc-300 mb-5"/>
                  <h3 className="text-2xl font-black mb-2">{t.cartEmpty}</h3>
                  <p className="text-zinc-400 mb-8">{t.cartEmptySub}</p>
                  <button onClick={()=>setView('shop')} className="px-8 py-3 bg-black text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#0066ff] transition-all">
                    {t.browseProducts}
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="bg-white rounded-2xl p-4 flex gap-4 border border-zinc-200">
                        <img src={item.image} className="w-24 h-24 rounded-xl object-cover shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-[#0066ff]">{item.brand}</p>
                          <h4 className="font-black text-sm mt-0.5 truncate">{item.name}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{t.size}: <span className="font-bold text-zinc-600">{item.selectedSize}</span></p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center bg-zinc-100 rounded-full overflow-hidden">
                              <button onClick={()=>updateQuantity(item.id,item.selectedSize,-1)} className="px-3 py-1.5 hover:bg-zinc-200 transition-all"><Minus size={12}/></button>
                              <span className="px-3 text-sm font-black">{item.quantity}</span>
                              <button onClick={()=>updateQuantity(item.id,item.selectedSize,1)} className="px-3 py-1.5 hover:bg-zinc-200 transition-all"><Plus size={12}/></button>
                            </div>
                            <button onClick={()=>removeFromCart(item.id,item.selectedSize)} className="text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-lg">â‚¬{item.price*item.quantity}</p>
                          {item.quantity>1 && <p className="text-xs text-zinc-400">â‚¬{item.price} {t.each}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-3xl border border-zinc-200 p-6 h-fit sticky top-4">
                    <h3 className="font-black text-xl mb-6">{t.orderSummary}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.subtotal}</span><span className="font-bold">â‚¬{total}</span></div>
                      {savings>0 && <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.savings}</span><span className="font-bold text-green-600">-â‚¬{savings}</span></div>}
                      <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.shipping}</span><span className="font-bold text-green-600">{total>=100?t.free:'â‚¬5.99'}</span></div>
                    </div>
                    {total<100 && <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-xs text-blue-700 font-bold">{t.addMore} â‚¬{(100-total).toFixed(0)} {t.moreForFree}</div>}
                    <div className="border-t pt-4 flex justify-between items-center mb-6">
                      <span className="font-black text-lg">{t.total}</span>
                      <span className="text-2xl font-black">â‚¬{total<100?(total+5.99).toFixed(2):total}</span>
                    </div>
                    <button onClick={()=>setView('checkout')} className="w-full py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all">
                      {t.checkout}
                    </button>
                    <button onClick={()=>setView('shop')} className="w-full py-3 text-zinc-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mt-3">
                      {t.continueShopping}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* CHECKOUT */}
          {view==='checkout' && (
            <motion.div key="checkout" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-4xl mx-auto">
              <button onClick={()=>setView('cart')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={16}/> {t.backToCart}
              </button>
              <div className="grid md:grid-cols-[1fr_280px] gap-8">
                <div className="bg-white rounded-3xl border border-zinc-200 p-8">
                  <h2 className="text-2xl font-black mb-8">{t.shippingPayment}</h2>
                  <div className="space-y-6">
                    {[
                      {field:'name', label:t.fullName, placeholder:'John Doe', type:'text'},
                      {field:'email', label:t.email, placeholder:'john@example.com', type:'email'},
                      {field:'address', label:t.address, placeholder:'123 Main St, Lisbon, Portugal', type:'text'},
                      {field:'card', label:t.card, placeholder:'1234 5678 9012 3456', type:'text'},
                    ].map(({field,label,placeholder,type}) => (
                      <div key={field}>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0066ff] block mb-2">{label} *</label>
                        <input type={type} placeholder={placeholder}
                          value={checkoutForm[field as keyof typeof checkoutForm]}
                          onChange={e=>{
                            const val = field==='card'
                              ? e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
                              : e.target.value;
                            setCheckoutForm(p=>({...p,[field]:val}));
                            setCheckoutErrors(p=>({...p,[field]:''}));
                          }}
                          className={`w-full border-b-2 py-3 outline-none bg-transparent text-sm transition-colors ${checkoutErrors[field] ? 'border-red-400' : 'border-zinc-200 focus:border-[#0066ff]'}`}
                        />
                        {checkoutErrors[field] && <p className="text-red-500 text-[10px] mt-1">{checkoutErrors[field]}</p>}
                      </div>
                    ))}
                    <button onClick={()=>{
                      const errs = validateCheckout();
                      setCheckoutErrors(errs);
                      if(Object.keys(errs).length===0) setView('success');
                    }} className="w-full py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all mt-4">
                      {t.placeOrder} Â· â‚¬{total<100?(total+5.99).toFixed(2):total}
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-zinc-200 p-6 h-fit">
                  <h3 className="font-black mb-4 text-sm uppercase tracking-wider">{t.order} ({cartCount} {t.items})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{item.name}</p>
                          <p className="text-[10px] text-zinc-400">Ã—{item.quantity} Â· {item.selectedSize}</p>
                        </div>
                        <p className="text-sm font-black shrink-0">â‚¬{item.price*item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-black">
                    <span>{t.total}</span>
                    <span>â‚¬{total<100?(total+5.99).toFixed(2):total}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view==='success' && (
            <motion.div key="success" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
              className="h-full flex flex-col items-center justify-center text-center p-10">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:0.1}}
                className="w-24 h-24 rounded-full bg-[#0066ff] flex items-center justify-center mb-8 shadow-2xl shadow-blue-200">
                <CheckCircle2 size={46} className="text-white"/>
              </motion.div>
              <span className="text-[#0066ff] text-[10px] font-black uppercase tracking-[0.4em] mb-4">{t.orderConfirmed}</span>
              <h2 className="text-5xl font-black leading-tight mb-4">{t.thankYou}<br/>{checkoutForm.name.split(' ')[0] || 'Athlete'}!</h2>
              <p className="text-zinc-400 max-w-md mb-2">{t.confirmation} <span className="font-bold text-zinc-600">{checkoutForm.email||t.yourEmail}</span>.</p>
              <p className="text-zinc-400 text-sm mb-10">{t.estDelivery} <span className="font-bold text-zinc-600">{t.deliveryDays}</span></p>
              <button onClick={()=>{setCart([]);setView('shop');setCheckoutForm({name:'',email:'',address:'',card:''});}}
                className="px-12 py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-full transition-all">
                {t.backToStore}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
