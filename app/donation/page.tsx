"use client";

import { useState } from "react";
import MainNavbar from "@/components/MainNavbar";
import { Heart, Coffee, Zap, Star, CreditCard, DollarSign, Wallet, Globe } from "lucide-react";

type Currency = "USD" | "NGN" | "USDT";

interface CurrencyOption {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
}

interface PaymentMethod {
  name: string;
  icon: any;
  description: string;
  color: string;
  currencies: Currency[];
}

export default function DonationPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD");
  const [customAmount, setCustomAmount] = useState<string>("");

  // Currency options
  const currencies: CurrencyOption[] = [
    { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira", flag: "🇳🇬" },
    { code: "USDT", symbol: "USDT", name: "Tether (USDT)", flag: "💰" },
  ];

  // Exchange rates (base: USD)
  const exchangeRates: Record<Currency, number> = {
    USD: 1,
    NGN: 1550,  // 1 USD = 1550 NGN
    USDT: 1,    // 1 USD = 1 USDT
  };

  // Payment methods
  const allPaymentMethods: PaymentMethod[] = [
    {
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Secure payment via Stripe",
      color: "text-blue-600 dark:text-blue-400",
      currencies: ["USD"],
    },
    {
      name: "PayPal",
      icon: DollarSign,
      description: "Quick & secure payments",
      color: "text-green-600 dark:text-green-400",
      currencies: ["USD", "NGN"],
    },
    {
      name: "Bank Transfer",
      icon: Wallet,
      description: "Direct bank transfer",
      color: "text-purple-600 dark:text-purple-400",
      currencies: ["NGN", "USD"],
    },
    {
      name: "Crypto Wallet",
      icon: Globe,
      description: "USDT (TRC20/ERC20)",
      color: "text-amber-600 dark:text-amber-400",
      currencies: ["USDT"],
    },
  ];

  // Filter payment methods by currency
  const availablePaymentMethods = allPaymentMethods.filter(method =>
    method.currencies.includes(selectedCurrency)
  );

  // Convert amount to selected currency
  const convertAmount = (usdAmount: number): string => {
    const converted = usdAmount * exchangeRates[selectedCurrency];
    const currency = currencies.find(c => c.code === selectedCurrency);
    
    if (selectedCurrency === "NGN") {
      return `${currency?.symbol}${Math.round(converted).toLocaleString()}`;
    } else if (selectedCurrency === "USDT") {
      return `${converted.toFixed(2)} ${currency?.symbol}`;
    } else {
      return `${currency?.symbol}${converted.toFixed(2)}`;
    }
  };

  // Donation tiers (base amounts in USD)
  const donationTiers = [
    {
      icon: Coffee,
      name: "Buy me a coffee",
      baseAmount: 5,
      description: "Support my daily coding fuel ☕",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Zap,
      name: "Power Boost",
      baseAmount: 10,
      description: "Help speed up development 🚀",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Star,
      name: "Super Supporter",
      baseAmount: 25,
      description: "Become a premium supporter ⭐",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      name: "Mega Fan",
      baseAmount: 50,
      description: "You're amazing! Thank you! 💖",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Support{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                moredev
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your donations help me continue building free tools and creating amazing content for the community. Every contribution makes a difference! 🙏
            </p>
          </div>

          {/* Currency Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Select Currency
            </h2>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {currencies.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCurrency === currency.code
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                      : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <div className="text-3xl mb-2">{currency.flag}</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-white">
                    {currency.code}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {currency.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Donation Tiers */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              Choose Your Support Level
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {donationTiers.map((tier, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${tier.color} rounded-lg mb-4 shadow-md`}>
                    <tier.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    {convertAmount(tier.baseAmount)}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {tier.description}
                  </p>
                  <button
                    className={`w-full py-3 px-4 bg-gradient-to-r ${tier.color} text-white rounded-lg font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                  >
                    Donate {convertAmount(tier.baseAmount)}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Available Payment Methods
            </h2>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              Payment options for {currencies.find(c => c.code === selectedCurrency)?.name}
            </p>
            <div className={`grid grid-cols-1 ${availablePaymentMethods.length === 2 ? 'sm:grid-cols-2' : availablePaymentMethods.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6`}>
              {availablePaymentMethods.map((method, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <method.icon className={`w-8 h-8 mx-auto mb-3 ${method.color}`} />
                  <h3 className="font-semibold mb-1 text-gray-800 dark:text-white">{method.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-700 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Custom Amount
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              Want to donate a different amount? Enter your preferred contribution below:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg font-semibold">
                  {selectedCurrency === "USDT" ? "" : currencies.find(c => c.code === selectedCurrency)?.symbol}
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder={selectedCurrency === "NGN" ? "10000" : selectedCurrency === "USDT" ? "10.00" : "25.00"}
                  min="1"
                  step={selectedCurrency === "NGN" ? "100" : "0.01"}
                  className={`w-full ${selectedCurrency === "USDT" ? "pl-4" : "pl-8"} pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                />
                {selectedCurrency === "USDT" && (
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm font-semibold">
                    USDT
                  </span>
                )}
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                Donate Now
              </button>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center mt-12 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
              Thank You! 🎉
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your support means the world to me and helps keep these projects free and accessible to everyone. 
              Together, we're building something amazing! 💪✨
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


