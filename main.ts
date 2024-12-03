controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.countdown() <= 0) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row - 1))
    }
})
info.onCountdownEnd(function () {
    for (let valor of tiles.getTilesByType(assets.tile`Bomb`)) {
        tiles.setTileAt(valor, assets.tile`FakeFloorTile`)
    }
})
function startGame () {
    tiles.setCurrentTilemap(tilemap`Base`)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 0))
    for (let index = 0; index < 15 + info.score(); index++) {
        randomX = randint(0, 9)
        randomY = randint(1, 6)
        tiles.setTileAt(tiles.getTileLocation(randomX, randomY), assets.tile`Bomb`)
    }
    info.startCountdown(3)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.countdown() <= 0) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(mySprite.tilemapLocation().column - 1, mySprite.tilemapLocation().row))
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.countdown() <= 0) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row + 1))
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.countdown() <= 0) {
        tiles.placeOnTile(mySprite, tiles.getTileLocation(mySprite.tilemapLocation().column + 1, mySprite.tilemapLocation().row))
    }
})
let randomY = 0
let randomX = 0
let mySprite: Sprite = null
game.setDialogFrame(assets.image`TextBox`)
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
scene.setBackgroundColor(12)
info.setScore(0)
startGame()
forever(function () {
    if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`FakeFloorTile`)) {
        game.gameOver(false)
    } else if (tiles.tileAtLocationEquals(mySprite.tilemapLocation(), assets.tile`Finish`)) {
        info.changeScoreBy(1)
        startGame()
    } else {
        tiles.setTileAt(mySprite.tilemapLocation(), assets.tile`transparency16`)
    }
})
