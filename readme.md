We have a reason, and execution environment, for code that looks like this:

user.devices.sessions.actions.filter(...)

Which in reality actually has several layers of asynchronous code:
* the devices are looked up in the database
* then the sessions are looked up in the database, for all devices
* then the actions are retrieved from all sessions and it's filtered

The way it's done at the moment is to throw promises and repeatedly re-run it until no promises are thrown.

This is crazy, but it works (https://github.com/richthegeek/node-deferred-object)

However, whilst it is somewhat-efficient (<1ms most of the time) it causes a bunch of problems (uncaught promises on edge cases) and generally is a bit of a hassle.

This is an attempt to make the code run only once, with breaks for asyncronous stuff to resolve.

The first step of this, however, is simply to make the javascript compile.

Frankly, this is almost definitely a very bad idea. But I'm doing it anyway.