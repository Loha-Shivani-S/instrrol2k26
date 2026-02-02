import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PLCGame from "./pages/PLCGame";
import SmartFactory from "./pages/SmartFactory";
import Members from "./pages/Members";
import Coordinators from "./pages/Coordinators";

import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/instrrol2k26">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plc-game" element={<PLCGame />} />
          <Route path="/smart-factory" element={<SmartFactory />} />
          <Route path="/members" element={<Members />} />
          <Route path="/coordinators" element={<Coordinators />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
