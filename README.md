# bamazon
CLI amazon-ish thing

This project is a node.js command line application that uses a either a local mySQL database or MS Azure SQl Server database for tracking the inventory of a virtual store.

The local version is functional, but the cloud version is still very much a work in progress.

You are given the initial options of:

? Would you like to see current [INVENTORY], [SHOP], [RETURN] and item, or talk to [CUSTOMER SERVICE]?

![screenshot1](/images/Capture1.png)

INVENTORY will display all the available items and their quantities in stock.

![screenshot1](/images/Capture2.png)

SHOP will allow you to "purchase" items and their stock will be lowered by the quantity you buy.

![screenshot1](/images/Capture3.png)

RETURN will lecture about commitment.

CUSTOMER SERVICE is currently staffed by Futurama's Bender. He's not very good at his job.

If you attempt to guy an out of stock item, it will inform you that it is out of stock and start you back at the beginning.

![screenshot1](/images/Capture4.png)

Otherwise you will be allowed to make the purshase and the stock will be decremented by the quantity.

![screenshot1](/images/Capture5.png)