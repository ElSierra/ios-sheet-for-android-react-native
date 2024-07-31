package me.hojoisaac.radius

import android.os.Build
import android.view.RoundedCorner
import android.view.View
import androidx.annotation.RequiresApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.AppContext



class RadiusModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Radius')` in JavaScript.
    Name("Radius")

    Constants {
      mapOf(
        "cornerRadius" to getCornerRadius()
      )
    }

    Function("getCornerRadius") {
      getCornerRadius()
    }
    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(RadiusView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: RadiusView, prop: String ->
        println(prop)
      }
    }
  }

  private fun getCornerRadius(): Int {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val currentActivity = appContext.currentActivity
      if (currentActivity != null) {
        val rootView = currentActivity.window?.decorView?.findViewById<View>(android.R.id.content)
        if (rootView != null) {
          val corner = rootView.rootWindowInsets?.getRoundedCorner(RoundedCorner.POSITION_TOP_LEFT)
          return corner?.radius ?: 0
        }
      }
    }
    return 0
  }
}
