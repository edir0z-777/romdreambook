import React from 'react';
import { SectionTitle } from '../../common/SectionTitle';

function StoryContent() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-white/30 rounded-3xl" />
      <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full mb-12" />
          <p className="text-2xl md:text-3xl text-purple-900 leading-relaxed font-light">
            כאמא טרייה, הבנתי את החשיבות של שיח משמעותי עם ילדים.
            ביליתי שנתיים מיוחדות עם רומי וחיפשתי דרכים להעשיר את עולמה
            באמצעות תוכן איכותי שיעודד דיאלוג, מחשבה ודמיון.
          </p>
          <p className="text-2xl md:text-3xl text-purple-900 leading-relaxed font-light mt-6">
            כך נולד ״עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי״ - ספר ייחודי המפתח שפה, דמיון,
            ומחזק את הקשר המיוחד בין הורים לילדים דרך חוויות משותפות ושיח מעשיר.
          </p>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-purple-300 to-transparent rounded-full mt-12" />
        </div>
      </div>
    </div>
  );
}

function BookQuote() {
  return (
    <div className="bg-purple-50/80 rounded-3xl shadow-lg overflow-hidden p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h3 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">
            עוֹלַם הַחֲלוֹמוֹת שֶׁל רוֹמִי
          </h3>
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-purple-800 font-light leading-relaxed">
              לַחֲלוֹמוֹת אֵין גְּבוּל, הֵם מְלֵאֵי דִּמְיוֹנוֹת:
            </p>
            <p className="text-xl md:text-2xl text-purple-700 font-light leading-relaxed">
              צוּרוֹת, חַיּוֹת, חֲפָצִים, מִסְפָּרִים, צְבָעִים
            </p>
            <p className="text-xl md:text-2xl text-purple-700 font-light leading-relaxed">
              וְעוֹלָמוֹת מֻפְלָאִים שֶׁבָּהֶם הַכֹּל יכוֹל לִקְרוֹת.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100 rounded-full blur-3xl opacity-20 animate-pulse" />
            <img
              src="/images/Romi_white_100-removebg-preview_Final.png"
              alt="רומי"
              className="w-full h-full object-contain relative z-10 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookStory() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle 
            title="הסיפור שמאחורי הספר"
            className="mb-12"
          />
          <div className="space-y-12">
            <StoryContent />
            <BookQuote />
          </div>
        </div>
      </div>
    </section>
  );
}