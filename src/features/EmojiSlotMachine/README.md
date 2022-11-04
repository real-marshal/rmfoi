# Some afterthoughts

## About the state

I started the main logic (not animation) as just one class to encapsulate the data and methods keeping it separated from the view. But when the time came to implement the view with React it turned out I needed lots of glue in-between, effectively killing all benefits of reactive React and instead doing all that updating logic manually and duplicating the state in React.

The easy way was to just plug in MobX to make the class auto-observable and use it directly without any problems. But I've never really used MobX and can't imagine debugging some complex state there. I could've used MobX only for this mini-project but it feels weird to have both redux and MobX in the codebase so instead I decided to rewrite the logic to redux store.

Now that I look at the store.ts, tbh it feels pretty crazy how much boilerplate redux still requires, even with RTK. So I'm not really sure if this was the right decision but well at least I remembered how to work with redux lol. Of course, I could've also just implemented everything in React, but I hate mixing logic with view. Ideally, I'd like to have it all in a class the way I started, but still, it's better be dependent on redux than react.

## Regarding animation

I spent at least 1-2 days to come up with this final algorithm and make it work consistently and still I'm not sure if this is the best way of doing this. Especially the jump, it's pretty hacky, requires prepended elements and limits a bit the possible stop indexes (which made me introduce maxIndexToWin). But it works perfectly and has good performance so that's fine I guess. Besides, I don't really have any ideas of how else I could do it better. Maybe with canvas? And Pixi to get that sweet WebGL performance?
