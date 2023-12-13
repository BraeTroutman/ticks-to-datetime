var possibleEvents = new Set(["input", "onpropertychange", "keyup", "change", "paste"]);

window.onload = () => {
  var ticksInput = document.getElementById("ticks") as HTMLInputElement;
  possibleEvents.forEach((eventName: string) => {
    ticksInput.addEventListener(eventName, (ev: Event) => {
      var inputElement = ev.target as HTMLInputElement;
      var handler = new TickInputHandler();
      handler.showResult(inputElement);
    })
  })
}

class TickInputHandler {
  static epochTicks: number = 621355968000000000;
  static ticksPerMillisecond: number = 10000;
  static maxDateMilliseconds: number = 8640000000000000;

  public showResult(inputElement: HTMLInputElement) {
    var valueStr = inputElement.value;
    var ticks = Number(valueStr);

    var dateTimeOutput = document.getElementById("datetime");
    dateTimeOutput.innerHTML = TickInputHandler.getDateString(ticks) 
  }

  static getDateString(ticks: number): string {
    if (isNaN(ticks)) {
      return "____-__-__T__:__:__.____Z";
    }

    var ticksSinceEpoch = ticks - TickInputHandler.epochTicks;
    var millisecondsSinceEpoch = ticksSinceEpoch / TickInputHandler.ticksPerMillisecond;
    if (millisecondsSinceEpoch > TickInputHandler.maxDateMilliseconds) {
      return "9999-99-99T99:99:99:9999Z";    
    }

    var date = new Date(millisecondsSinceEpoch);
    return date.toISOString();
  }

}
