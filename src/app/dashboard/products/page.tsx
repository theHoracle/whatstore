import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Management | WhatStore",
  description: "Manage your digital products inventory. Upload new products, edit listings, track inventory, and optimize your product catalog.",
  robots: "noindex, nofollow", // Dashboard pages should be private
  openGraph: {
    title: "Digital Products Management | WhatStore",
    description: "Manage your digital products inventory. Upload new products, edit listings, track inventory, and optimize your product catalog."
  }
};

const ProductsPage = () => {
  return <div>Products</div>;
};

export default ProductsPage;
