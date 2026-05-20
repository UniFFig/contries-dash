This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

```bash
npm run dev
```
For local development/viewing - [http://localhost:3000](http://localhost:3000)

## Technologies used: 

- Nextjs and Tailwind as specified in the Technical Assessment brief
- Zustand - For event driven architecture - In a small application like this with little chance of future enhancement this is a good option but if I were going to build this for scale I would consider adding parellel routing as it would allow for some easier and more interesting selection specific changes for the individual country data
- Chartjs - For the graphs used in the application - It was my first time using this package and while it was easy to impliment, I would most likely look elsewhere for future/more complex project as it didn't have the depth of analytical tools that I would normally want



## Summary of AI Prompts: 

- I used AI mostly to quickly wireframe some of the UI components such as the Country table which I then used as a base where I could change and slot in my own data/UI specific changes(pagination, colors, etc)
    - example: I need a typescript/nextjs table for the purpose of displaying all of the countries and their basic statistics. Data can be mocked for now and you only need to include 3 fake entries for the table as long as it will handle longer arrays as well.
- I also used AI to fix a bug specific to the resizing of some chartjs components where setting the maintainAspectRatio prop in the doughnut caused the component to grow infinitely 
- The Icon in the header was quickly made using AI as there was no need to design an actual icon 
- AI was used as a last set of eyes as a reviewer, some unneeded code was removed and slightly reformatted for better readability based on the recommendations

