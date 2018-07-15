
const hasKeyWithVal = (arr, key, val) => {
  return !!arr.find(el => {
    return el[key] === val
  })
}

export default hasKeyWithVal;
