import React from 'react';

export function QuoteText() {
  return (
    <div className="text-center md:text-right">
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
  );
}