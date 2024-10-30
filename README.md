Hello, the person grading this

Over the course of 3 days, starting on Monday, I recreated the page I was given. Unfortunately, I had to start later, because of some dire circumstances. I apologize for that, but there was nothing I could do about that.

I implemented a register and login page, as requested. I simulated server requests with a loading component.
The forms were handled via custom hook, that works on change of a form. It is quite nuanced, but it is the mechanism I came up with. Usually it is used with onCHange attribute, bu you coul simulate an event and change the values.
One mistake I made, is that I set up deploment, saw that it works, and then completely forgot about it, assuming it is fine. Well, no, ESLint didn't think so. So, it wasn't until the very end I noticed a bunch of failed runs... I should have checked sooner, but I completely forgot about that.
The second mistake, is that I did not pay attention to the routing. Locally, everything worked great. But Github has its issues(I had to work around the same way when was first starting to deploy using react) - so at the very end I noticed that the urls, paths, images were broken... 
I managed to get the images images to load, and it seems, all the links. But I cannot guarantee that. I should have checked way earlier, but I completely forgot.

Nevertheless, I present to you my recreation of the given task. I really hope to hear back, if not for follow up, but just for learning what I could have done better.
All the best,
Dmytro
