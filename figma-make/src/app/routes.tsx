import React from "react";
import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Admissions } from "./components/Admissions";
import { CourseRegistration } from "./components/CourseRegistration";
import { FinancialAid } from "./components/FinancialAid";
import { Housing } from "./components/Housing";
import { Payments } from "./components/Payments";
import { PaymentPlan } from "./components/PaymentPlan";
import { DocumentUpload } from "./components/DocumentUpload";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "admissions", Component: Admissions },
      { path: "courses", Component: CourseRegistration },
      { path: "financial-aid", Component: FinancialAid },
      { path: "housing", Component: Housing },
      { path: "payments", Component: Payments },
      { path: "payment-plan", Component: PaymentPlan },
      { path: "documents/upload", Component: DocumentUpload },
    ],
  },
]);
