import React from 'react';

export function AuthorBio() {
  return (
    <div className="text-center md:text-right">
      <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4">
        ענת רוזנשטיין - מחברת הספר
      </h2>
      <p className="text-xl md:text-2xl text-purple-800 leading-relaxed">
        בת 34, נשואה ואמא לרומי גאיה ואופק.
        בעלת תואר בפסיכולוגיה וחינוך, בוגרת מכון אדלר.
        מומחית לתחום ההורות והחינוך, מנחת סדנאות,
        ומדריכת הורים לעיסוי תינוקות.
      </p>
    </div>
  );
}