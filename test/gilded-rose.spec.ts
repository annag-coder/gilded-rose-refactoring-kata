import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const ITEM_NAMES = {
    GENERAL: '+5 Dexterity Vest',
    AGED: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
}

const generalSellInCheck = itemName => it('should decrease sellIn by 1', function() {
    const gildedRose = new GildedRose([ new Item(itemName, 3, 20) ]);
    let items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(2);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(1);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(0);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
});

const noChangeSellInCheck = itemName => it('should never decrease sellIn', function() {
    const gildedRose = new GildedRose([ new Item(itemName, 3, 20) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(3);
});

describe('Gilded Rose: updateQuality', function () {
    describe('General item', function () {
        generalSellInCheck(ITEM_NAMES.GENERAL)

        it('should degrade quality by 1', function() {
            const gildedRose = new GildedRose([ new Item(ITEM_NAMES.GENERAL, 3, 20) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(19);
        });
    });

    describe('Aged item', function () {
        generalSellInCheck(ITEM_NAMES.AGED)
    });

    describe('Backstage item', function () {
        generalSellInCheck(ITEM_NAMES.BACKSTAGE)
    });

    describe('Sulfuras item', function () {
        noChangeSellInCheck(ITEM_NAMES.SULFURAS)
    });
});
