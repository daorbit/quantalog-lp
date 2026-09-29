"use client";

import { useState } from "react";
import { products } from "./products";
import { ProductPanel } from "./product-panel";
import { SegmentedControl } from "../segmented-control";

export function FeaturesShowcase() {
  const [activeId, setActiveId] = useState(products[0].id);
  const product = products.find((p) => p.id === activeId) ?? products[0];

  return (
    <>
      <SegmentedControl
        options={products}
        value={activeId}
        onChange={setActiveId}
        label="Products"
        idPrefix="product-tab"
        controls="product-panel"
      />
      <div
        id="product-panel"
        role="tabpanel"
        aria-labelledby={`product-tab-${activeId}`}
        className="mt-12 sm:mt-16"
      >
        <ProductPanel key={activeId} product={product} />
      </div>
    </>
  );
}
