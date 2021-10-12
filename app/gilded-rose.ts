export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const ITEM_TYPES = {
    AGED: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
    CONJURED: 'Conjured Mana Cake',
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        const updateSellIn = itemKey => {
           this.items[itemKey].sellIn = this.items[itemKey].sellIn - 1
        }

        for (let i = 0; i < this.items.length; i++) {
            const currentSellIn = this.items[i].sellIn
            const currentQuality = this.items[i].quality

            if (this.items[i].name === ITEM_TYPES.SULFURAS) {
                // do nothing as both quality and sellIn should not change
            } else if (this.items[i].name === ITEM_TYPES.AGED) {
                updateSellIn(i)

                if (currentSellIn > 0) {
                     this.items[i].quality = currentQuality < 50 ? currentQuality + 1 : 50
                } else {
                     this.items[i].quality = currentQuality < 49 ? currentQuality + 2 : 50
                }
            } else if (this.items[i].name === ITEM_TYPES.BACKSTAGE) {
                updateSellIn(i)

                if (currentSellIn > 10) {
                     this.items[i].quality = currentQuality < 50 ? currentQuality + 1 : 50
                } else if (currentSellIn > 5) {
                     this.items[i].quality = currentQuality < 49 ? currentQuality + 2 : 50
                } else if (currentSellIn > 0) {
                     this.items[i].quality = currentQuality < 48 ? currentQuality + 3 : 50
                } else {
                     this.items[i].quality = 0
                }
            } else if (this.items[i].name === ITEM_TYPES.CONJURED) {
                updateSellIn(i)

                if (currentSellIn > 0) {
                     this.items[i].quality = currentQuality > 2 ? currentQuality - 2 : 0
                } else {
                     this.items[i].quality = currentQuality > 4 ? currentQuality - 4 : 0
                }
            } else  {
                // default item
                updateSellIn(i)

                if (currentSellIn > 0) {
                     this.items[i].quality = currentQuality > 1 ? currentQuality - 1 : 0
                } else {
                     this.items[i].quality = currentQuality > 2 ? currentQuality - 2 : 0
                }
            }
        }

        return this.items;
    }
}
