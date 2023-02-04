export default class ClassCtrl {
  /**
   * Vérification de l'intégrité des données reçues
   * avec l'utilisation de regex si il s'agit d'une chaine de caractères
   *
   * @param schemaData
   * @param dataToVerif
   *
   * @returns
   */
  static verifSecure = (schemaData, dataToVerif) => {
    let listError = []
    //Vérification que le body est correctement rempli
    schemaData.forEach((val) => {
      if (!Object.keys(dataToVerif).includes(val.label)) {
        listError.push(`Champ ${val.label} manquant`)
      }
    })

    //Vérification que les données sont correctement remplies
    Object.entries(dataToVerif).forEach(([key, value]) => {
      if (schemaData.find((item) => item.label.match(key))) {
        let typeVal = schemaData.find((item) => item.label.match(key))?.type
        if (!value || value === '') {
          listError.push(`Champ ${key} vide`)
        } else {
          if (typeof value === typeVal) {
            if (typeVal === 'string') {
              let reg = new RegExp(
                '[^a-z0-9-àáâãäåòóôõöøèéêëçìíîïùúûüÿñ_s@.]+',
                'gmi'
              )
              let testReg = reg.test(value)
              if (testReg) {
                console.log(typeVal)
                listError.push(`Format du champ ${key} incorrecte`)
              }
            }
          } else {
            listError.push(`Format du champ ${key} incorrecte`)
          }
        }
      }
    })
    console.log(listError)

    return listError
  }

  /**
   * Vérification de l'intégrité des données reçues
   *
   * @param keyData
   * @param dataVerif
   *
   * @returns
   */
  static verif = (keyData, dataVerif) => {
    let listError = []
    //Vérification que le body est correctement rempli
    keyData.forEach((val) => {
      if (!Object.keys(dataVerif).includes(val)) {
        listError.push(`Champ ${val} manquant`)
      }
    })

    //Vérification que les données sont correctement remplies
    Object.entries(dataVerif).forEach(([key, value]) => {
      if ((!value || value === '') && keyData.includes(key)) {
        listError.push(`Champ ${key} vide`)
      } else if (
        ((!value || value === '') && !keyData.includes(key)) ||
        !keyData.includes(key)
      ) {
        listError.push(`Champ ${key} non autorisé`)
      }
    })
    return listError
  }

  /**
   * Vérification de l'intégrité des données optionnelles reçues avec possibilité d'avoir moins 1 des champs requis
   *
   * @param keyData
   * @param dataToVerif
   * @param OneAtLeast
   *
   * @returns
   */
  static verifWithOption = (keyData, dataToVerif, OneAtLeast = false) => {
    let listOption = []
    let result = []

    keyData.forEach((val) => {
      if (Object.keys(dataToVerif).includes(val.label)) {
        listOption.push(val.label)
      }
    })

    if (listOption.length > 0) result = this.verif(listOption, dataToVerif)
    else if (listOption.length === 0 && OneAtLeast) {
      let response = 'Au moins 1 des champs suivant est requis : '
      result.push(response.concat(keyData.join(', ')))
    }

    return result
  }
}
