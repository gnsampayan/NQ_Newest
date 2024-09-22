import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<CartProvider>
				<App />
			</CartProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
