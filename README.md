# Fork of conditionize.js
A small jQuery plugin for handling showing and hiding things conditionally based on input - typically groups of form fields. It works using data attributes to keep all of the name/values for inputs directly in the markup and saves you the trouble of having to manually show/hide a bunch of stuff through JS, as well as improving maintenance if you need to change the name or value of an input you were listening to.

# Usage
Conditionize looks for the name of an input to listen to and a value to listen for via data attributes on the element it is initialized on.

To use it, encapsulate form fields you want to show only conditionally in a container with the data attributes data-cond-option and data-cond-value, data-cond-type, data-option-type. Give all containers you want conditionize to listen to a class.



```html
<label for="foo"><input name="foo" type="checkbox"> Foo</label>
<div class="conditional" data-cond-option="foo" data-cond-value="on" data-cond-option-type="checkbox|select|text|etc" data-cond-type="equals|or|not_equals">
  Bar
</div>
```

Then, call conditionize on the class...

```javascript
  $('.conditional').conditionize();
```

# Demo

http://codepen.io/renvrant/pen/ogeeBY
