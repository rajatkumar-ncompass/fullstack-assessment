import React from "react";
import { Route, Routes } from "react-router-dom";

import Registration from "../Registration/Registration";
import ProductCatalogue from "../Catalogue/ProductCatalogue";
import ProductDescription from "../Product/ProductDescription";
import Profile from "../Profile/Profile";

const Index = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Registration />} />
      <Route path="/" element={<ProductCatalogue />} />
      <Route path="product/:id" element={<ProductDescription />} />
      <Route path="profile/" element={<Profile />} />
    </Routes>
  );
};

export default Index;
