function checkFilter(category, title, checked) {

  //Add or remove the filter to the genre filter array
  if (checked) {
    //Category could be genre or time, so this[genre] or this[time]
    this[category].push(title);
  } else {
    let index = this[category].indexOf(title);
    if (index > -1) {
      this[category].splice(index, 1);
    }
  }
}

export { checkFilter };
