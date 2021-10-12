import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

const ITEM_NAMES = {
    GENERAL: '+5 Dexterity Vest',
    AGED: 'Aged Brie',
    SULFURAS: 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
}

const generalSellInCheck = itemName => it('should decrease sellIn by 1', function() {
    const gildedRose = new GildedRose([
        new Item(itemName, -1, 20),
        new Item(itemName, 0, 20),
        new Item(itemName, 1, 20),
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-2);
    expect(items[1].sellIn).to.equal(-1);
    expect(items[2].sellIn).to.equal(0);
});

const noChangeSellInCheck = itemName => it('should never change sellIn', function() {
    const gildedRose = new GildedRose([
        new Item(itemName, -1, 80),
        new Item(itemName, 0, 80),
        new Item(itemName, 1, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(-1);
    expect(items[1].sellIn).to.equal(0);
    expect(items[2].sellIn).to.equal(1);
});

const generalQualityCheck = itemName => {
    it('should decrease quality by 1 before sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 3, 2),
            new Item(itemName, 3, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
        expect(items[1].quality).to.equal(0);
    });

    it('should decrease quality by 2 after sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 0, 10),
            new Item(itemName, 0, 5),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(8);
        expect(items[1].quality).to.equal(3);
    });

    it('should never drop quality below 0', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 0, 2),
            new Item(itemName, 0, 1),
            new Item(itemName, 0, 0),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[1].quality).to.equal(0);
        expect(items[2].quality).to.equal(0);
    });
}

const noChangeQualityCheck = itemName => it('should never change quality', function() {
    const gildedRose = new GildedRose([
        new Item(itemName, -1, 80),
        new Item(itemName, 0, 80),
        new Item(itemName, 1, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[1].quality).to.equal(80);
    expect(items[2].quality).to.equal(80);
});

const agedQualityCheck = itemName => {
    it('should increase quality by 1 before sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 3, 0),
            new Item(itemName, 3, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
        expect(items[1].quality).to.equal(2);
    });

    it('should increase quality by 2 after sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 0, 0),
            new Item(itemName, 0, 1),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[1].quality).to.equal(3);
    });

    it('should never increase quality above 50', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 1, 48),
            new Item(itemName, 1, 49),
            new Item(itemName, 1, 50),
            new Item(itemName, 0, 47),
            new Item(itemName, 0, 48),
            new Item(itemName, 0, 49),
            new Item(itemName, 0, 50),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(49);
        expect(items[1].quality).to.equal(50);
        expect(items[2].quality).to.equal(50);
        expect(items[3].quality).to.equal(49);
        expect(items[4].quality).to.equal(50);
        expect(items[5].quality).to.equal(50);
        expect(items[6].quality).to.equal(50);
    });
}

const backstageQualityCheck = itemName => {
    it('should increase quality by 1 before 10 days to sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 12, 1),
            new Item(itemName, 11, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(2);
        expect(items[1].quality).to.equal(2);
    });

    it('should increase quality by 2 before 5 days to sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 10, 1),
            new Item(itemName, 6, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(3);
        expect(items[1].quality).to.equal(3);
    });

    it('should increase quality by 3 before 0 days to sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 5, 1),
            new Item(itemName, 1, 1),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
        expect(items[1].quality).to.equal(4);
    });

    it('should never increase quality above 50', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 11, 49),
            new Item(itemName, 11, 50),
            new Item(itemName, 10, 49),
            new Item(itemName, 10, 50),
            new Item(itemName, 5, 49),
            new Item(itemName, 5, 50),
            new Item(itemName, 1, 49),
            new Item(itemName, 1, 50),
        ]);
        let items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(50);
        expect(items[1].quality).to.equal(50);
        expect(items[2].quality).to.equal(50);
        expect(items[3].quality).to.equal(50);
        expect(items[4].quality).to.equal(50);
        expect(items[5].quality).to.equal(50);
        expect(items[6].quality).to.equal(50);
        expect(items[7].quality).to.equal(50);
    });

    it('should drop quality to 0 after sellIn', function() {
        const gildedRose = new GildedRose([
            new Item(itemName, 0, 1),
            new Item(itemName, 0, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
        expect(items[1].quality).to.equal(0);
    });
}

describe('Gilded Rose: updateQuality', function () {
    describe('General item', function () {
        generalSellInCheck(ITEM_NAMES.GENERAL)
        generalQualityCheck(ITEM_NAMES.GENERAL)
    });

    describe('Aged item', function () {
        generalSellInCheck(ITEM_NAMES.AGED)
        agedQualityCheck(ITEM_NAMES.AGED)
    });

    describe('Backstage item', function () {
        generalSellInCheck(ITEM_NAMES.BACKSTAGE)
        backstageQualityCheck(ITEM_NAMES.BACKSTAGE)
    });

    describe('Sulfuras item', function () {
        noChangeSellInCheck(ITEM_NAMES.SULFURAS)
        noChangeQualityCheck(ITEM_NAMES.SULFURAS)
    });
});
