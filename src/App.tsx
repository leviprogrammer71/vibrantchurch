import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Layout } from "@/components/layout/Layout";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { PageTransition } from "@/components/ui/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Import About directly (not lazy) to avoid Firefox/Safari chunk-loading issues
import About from "./pages/About";

// Code-split route components for better performance
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const Visit = lazy(() => import("./pages/Visit"));
const Ministries = lazy(() => import("./pages/Ministries"));
const Events = lazy(() => import("./pages/Events"));
const Watch = lazy(() => import("./pages/Watch"));
const Give = lazy(() => import("./pages/Give"));
const Auth = lazy(() => import("./pages/Auth"));
const StaffLogin = lazy(() => import("./pages/StaffLogin"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <RouteErrorBoundary>
              <PageTransition>
                <About />
              </PageTransition>
            </RouteErrorBoundary>
          }
        />
        <Route
          path="/visit"
          element={
            <PageTransition>
              <Visit />
            </PageTransition>
          }
        />
        <Route
          path="/ministries"
          element={
            <PageTransition>
              <Ministries />
            </PageTransition>
          }
        />
        <Route
          path="/events"
          element={
            <PageTransition>
              <Events />
            </PageTransition>
          }
        />
        <Route
          path="/watch"
          element={
            <PageTransition>
              <Watch />
            </PageTransition>
          }
        />
        <Route
          path="/give"
          element={
            <PageTransition>
              <Give />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/auth"
          element={
            <PageTransition>
              <Auth />
            </PageTransition>
          }
        />
        <Route
          path="/staff"
          element={
            <PageTransition>
              <StaffLogin />
            </PageTransition>
          }
        />
        <Route
          path="/admin"
          element={
            <PageTransition>
              <Admin />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <SkipToContent />
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <AnimatedRoutes />
                </Suspense>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
