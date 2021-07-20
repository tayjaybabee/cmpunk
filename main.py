"""

When we engage the 'A' momentary switch we check for the armed flag. If the payload is armed we engage it.

"""
# Set up two hooks for the slide switch. The value for PAYLOAD is either 1 (Unix) or 2 (Windows) after initialization

def on_switch_moved_right():
    global PAYLOAD
    light.show_animation(light.rainbow_animation, 500)
    PAYLOAD = 2
input.on_switch_moved(SwitchDirection.RIGHT, on_switch_moved_right)

def payloadLinux():
    keyboard.modifier_key(KeyboardModifierKey.ALT, KeyboardKeyEvent.DOWN)
    keyboard.key("t", KeyboardKeyEvent.PRESS)
    pause(1000)
    keyboard.modifier_key(KeyboardModifierKey.CONTROL_ALT, KeyboardKeyEvent.UP)
    keyboard.function_key(KeyboardFunctionKey.DELETE_FORWARD, KeyboardKeyEvent.UP)
    for index in range(2):
        keyboard.function_key(KeyboardFunctionKey.TAB, KeyboardKeyEvent.PRESS)
        pause(200)
    keyboard.function_key(KeyboardFunctionKey.ENTER, KeyboardKeyEvent.PRESS)
    pause(200)
def payloadWindows():
    keyboard.modifier_key(KeyboardModifierKey.CONTROL_ALT, KeyboardKeyEvent.PRESS)
    keyboard.function_key(KeyboardFunctionKey.DELETE_FORWARD, KeyboardKeyEvent.PRESS)
    for index2 in range(7):
        keyboard.function_key(KeyboardFunctionKey.TAB, KeyboardKeyEvent.PRESS)
        pause(100)
    keyboard.function_key(KeyboardFunctionKey.ENTER, KeyboardKeyEvent.PRESS)
    pause(100)
    keyboard.function_key(KeyboardFunctionKey.DOWN_ARROW, KeyboardKeyEvent.PRESS)
    pause(100)
    keyboard.function_key(KeyboardFunctionKey.ENTER, KeyboardKeyEvent.PRESS)
    music.zapped.play()
    light.set_all(0x00ff00)
    pause(1000)

def on_button_a_click():
    global armed
    if armed >= 1:
        if PAYLOAD == 1:
            payloadWindows()
        else:
            payloadLinux()
        armed = 0
        music.ba_ding.play()
        light.set_all(0xffff00)
        pause(1000)
        light.show_animation(light.sparkle_animation, 500)
    music.buzzer.play()
input.button_a.on_event(ButtonEvent.CLICK, on_button_a_click)

def on_button_b_click():
    global armed
    music.stop_all_sounds()
    if armed >= 1:
        armed = 0
        
        def on_run_in_parallel():
            music.play_melody("E F G F G F E D ", 120)
        control.run_in_parallel(on_run_in_parallel)
        
        light.show_animation(light.color_wipe_animation, 500)
    else:
        armed = 1
        
        def on_run_in_parallel2():
            music.play_melody("E F E F G A G A ", 300)
        control.run_in_parallel(on_run_in_parallel2)
        
        light.show_animation(light.theater_chase_animation, 1000)
        light.set_all(0xff0000)
input.button_b.on_event(ButtonEvent.CLICK, on_button_b_click)

def on_switch_moved_left():
    global PAYLOAD
    light.show_animation(light.comet_animation, 1000)
    music.knock.play()
    PAYLOAD = 1
input.on_switch_moved(SwitchDirection.LEFT, on_switch_moved_left)

armed = 0
PAYLOAD = 0
isRight = input.switch_right()
if input.switch_right():
    PAYLOAD = 2
else:
    PAYLOAD = 1
armed = 0
music.set_volume(100)
pause(1000)
music.power_up.play()
pause(1000)
music.stop_all_sounds()

def on_forever():
    if armed >= 1:
        light.show_animation(light.theater_chase_animation, 1000)
        light.show_animation(light.sparkle_animation, 1000)
    else:
        light.show_animation(light.color_wipe_animation, 500)
forever(on_forever)
