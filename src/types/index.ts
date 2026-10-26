export type CategorySlug = 
  | 'sweets'
  | 'flowers'
  | 'supermarkets'
  | 'restaurants'
  | 'pets'
  | 'beauty'
  | 'electronics'
  | 'pharmacies';

export interface Category {
  id: string;
  slug: CategorySlug;
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  longDescAr: string;
  iconName: string;
  coverImage: string;
  illustrationImage: string;
  bannerImage: string;
  storeCount: number;
  subcategories: { id: string; nameAr: string; nameEn: string }[];
  metadataLabels: {
    specialtyLabel: string;
    deliveryEstimateLabel: string;
    featureHighlightLabel: string;
  };
  accentColor?: string;
}

export interface Store {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  categorySlug: CategorySlug;
  subcategoryIds: string[];
  descriptionAr: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMinutes: number;
  deliveryFee: number; // in SAR (0 = free)
  minimumOrder: number; // in SAR
  isOpen: boolean;
  openHoursAr: string;
  phone: string;
  addressAr: string;
  promoBadge?: {
    textAr: string;
    type: 'discount' | 'free_delivery' | 'exclusive' | 'new';
  };
  specialtyAr: string;
  tagsAr: string[];
  isFeatured?: boolean;
}

export interface ProductAttributeOption {
  id: string;
  nameAr: string;
  priceModifier?: number; // additional SAR
}

export interface ProductAttribute {
  id: string;
  nameAr: string;
  required: boolean;
  options: ProductAttributeOption[];
}

export interface Product {
  id: string;
  storeId: string;
  storeSlug: string;
  storeNameAr: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  price: number; // in SAR
  originalPrice?: number; // in SAR (if discounted)
  currency: string; // e.g. "ر.س"
  internalCategoryId: string;
  internalCategoryNameAr: string;
  image: string;
  galleryImages: string[];
  inStock: boolean;
  stockCount?: number;
  rating: number;
  reviewCount: number;
  attributes?: ProductAttribute[];
  tagsAr: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique item id (composite of product id + chosen options)
  productId: string;
  product: Product;
  storeId: string;
  storeSlug: string;
  storeNameAr: string;
  storeLogo: string;
  storeDeliveryFee: number;
  quantity: number;
  selectedAttributes?: Record<string, string>; // attributeId -> optionId
  unitPrice: number;
}

export interface StoreFilterState {
  searchQuery: string;
  subcategoryId: string; // 'all' or subcategory id
  sortBy: 'recommended' | 'rating' | 'deliveryTime' | 'name' | 'minOrder';
  isOpenOnly: boolean;
  isFreeDeliveryOnly: boolean;
}

export interface ProductFilterState {
  searchQuery: string;
  categoryId: string; // 'all' or store internal category
  sortBy: 'popular' | 'priceAsc' | 'priceDesc' | 'rating';
  inStockOnly: boolean;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  city: string;
  deliveryAddress: string;
  notes?: string;
  paymentMethod: 'mada' | 'applepay' | 'visa' | 'cash';
}
