Angry Physics
===

**[ONLINE DEMO](http://ncase.me/birds)**

A proof-of-concept for my theory on Explorable Explanations.

Interactivity can be used to let the user explore a system,
and apply a scientific learning method towards it.
There are three steps to scientific learning:

1. **See** - the user plays around, seeing concrete examples of cause/effect
2. **Model** - the user discovers relationships within the system, and abstracts.
3. **Predict** - the user applies their knowledge to predict and manipulate a system.

---

In this proof-of-concept toy, the player is guided through these three steps continuously.
Guided not by words or images; but by the nature of the mechanics themselves.
Here's how:

###1. See

First, the player messes around with the mouse, and
sees that the red bar corresponds to the angle they're aiming at.
Then, they click their mouse, and see the bird catapult through the air, and land.
Meanwhile, they also see a red dot on the graph traveling from the X axis to some spot elsewhere, and stays there.
This, alongside minimal text, shows that the graph is of a bird's landing position vs the angle they were fired at.

This is the first loop of the core interaction.
The second time, a pig pops up. The player can attempt to fire a bird at the pig, and would most likely miss.
At this point, hitting the pig is hard.

###2. Model

After enough tries, the player would have created enough red dots on the graph to realize a pattern.
At some point, which is not pre-determined, the player will realize there's a relationship
between where the bird lands, and what angle they fired the bird at.
They could fire extra birds at this time to better flesh out what the relationship is, exactly.
As it turns out, it's a full sine wave.

From this point, the player may realize they can exploit this information, using it to target pigs more easily.

###3. Predict

The green bar on the graph corresponds with the pig's position.
If the player were to look at where this green bar intersects with the sine wave pattern they've discovered/created,
they can find the right angles to hit the pig directly.
They might also realize, from looking at the graph, there will *always* be two ways to directly hit a pig.
At this point, hitting the pig is easy.

And voila! The player has successfully gone from playing with the system, finding hidden relationships, and
using that knowledge to exploit the system itself. Science!

---

###Further Notes:

In this demo, the player will discover the sine-wave relationship, but not know *why*.

For that, they'd need to know the other formulae and patterns behind gravitational physics & trigonometry.
Most of that can be described with text, images, animations... and maybe even interactive toys like this one!

For example, if this toy let you manipulate/graph not just angle & landing position,
but also speed of initial velocity, initial position, velocity, acceleration, etc...
the player could discover more hidden relationships, and have a better understanding of physics.
What might be best is starting them off with simple relationships such as d = v*t or d = a*t^2,
manually guiding them upwards to more complicated Newtonian physics.

