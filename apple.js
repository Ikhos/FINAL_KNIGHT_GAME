class Apple {
    constructor() {
        this.y = random(400, 700);
        this.x = 1500;
        this.sprite = createSprite(this.x, this.y);
        this.sprite.addImage(appleImage);
        this.sprite.velocityX = -4;
        this.sprite.lifetime = (1500);
        this.sprite.scale = 0.1;
    }
}