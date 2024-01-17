# 🍎 KwikMaffs

A small package to tackle some JS maths shortcomings.

## 🍐 Table of Contents

- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Contributing](#contributing)
  - [License](#license)

## 🥦 Introduction

This NPM package is a solution to JavaScript's inability to handle certain mathematical concepts.
The core concept is to address these issues via a string literal based solution and manual handling of numbers. The solution is intentionally verbose and performance is not considered. It is simply a study of logic.

## 🥨 Getting Started

1. Add the package to your project with npm i kwikmaffs@latest
2. import the kwikmaffs class: import KwikMaffs from 'kwikmaffs'; 
3. Create a new instance of KwikMaffs: const newKM = new KwikMaffs(); 
4. Package functions are now available on newKM: newKM.roundDecimal(1.2452, 3); 

## 🫑 Features

The following functions are offered on the KwikMaffs class. 
Examples assume you have created a new KwikMaffs called newKM, as per the Getting Started section.

### Round Decimal

This function is designed to round a decmial to a given precision, e.g. 
```const roundedNumber = newKM.roundDecimal(1.234, 2); // 1.23```

in addition, it will bubble up the rounding if needed, e.g. 

```const bubbleUpNumber = newKM.roundDecial(1.99999999, 2); // 2```

### toCents 

When doing financial calculations, it is best practice to use cents (299c) in place of dollars ($2.99), as it allows the use of whole numebrs and avoids a whole class of potential errors. 
The toCents function will convert a floating dollar.cents number (e.g. $4.50), to a cents amount. 
This might seem trivial (i.e. Math.floor(num * 100)), however due to some low level language features, it is not quite that simple. e.g.

```16.99 * 100; // 1698.9999999999998

   // and 
   Math.floor(16.99 * 100); // 1698 cents?!
```

To address this, KwikMaffs supplies a reliable function to convert to cents, e.g. 

``` const niceCents = newKM.toCents(16.99); // 1699
```

### cleanCents

Once we have converted all our numbers to cents, we want to stay in whole numbers. This function simple removes any floating point values (i.e. fractional cents) inbetween calculations, e.g.

 ```const costInCents = 1699; 

    const costOverSevenWeeks = 1699 / 7; // 242.714285714285714 <- This is fractional cents
    const noFracCents = newKM.cleanCents(costOverSevenWeeks); // 242 
    // (note that there is a loss here of 0.714285714285714)
```

### toDollars 

This function is the inverse of toCents, and is useful for displaying amounts to the user once the maths is all done, e.g. 

 ```const finalCostInCents = 3495; // cents
    const finalCostInDollars = newKM.toDollars(finalCostInCents); // 35.95 
```

## 🍌 Prerequisites

None - the package has no dependencies. 

## 🍍 Contributing 

I mean, if you really want to open a PR, you can. I might even approve it! 

## 🫐 License

KwikMaffs © 2023 by sslukess is licensed under MIT
