export default class ClassCtrl {
  /**
   * Vérification de l'intégrité des données reçues
   *
   * @param schemaData
   * @param dataToVerif
   *
   * @returns
   */
  static verifSecure = (schemaData, dataToVerif) => {
    let listError = []

    // Vérification que le body est correctement rempli
    schemaData.forEach((val) => {
      if (!Object.keys(dataToVerif).includes(val.label)) {
        listError.push(`Champ ${val.label} manquant`)
      }
    })

    // Vérification que les données sont correctement remplies
    Object.entries(dataToVerif).forEach(([key, value]) => {
      if (schemaData.find((item) => item.label.match(key))) {
        let typeVal = schemaData.find((item) => item.label.match(key)).type

        if (!value || value === '') {
          listError.push(`Champ ${key} vide`)
        } else {
          if (Array.isArray(value)) {
            if (typeVal !== 'array') {
              listError.push(`Format du champ ${key} incorrecte`)
            }
          } else if (typeof value === 'object') {
            if (!value.hasOwnProperty('$oid')) {
              listError.push(`Format du champ ${key} incorrecte`)
            }
          } else if (typeof value === 'number') {
            if (isNaN(value)) {
              listError.push(`Format du champ ${key} incorrecte`)
            }
          } else if (typeof value === 'string') {
            if (typeVal === 'email') {
              let reg =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              let testReg = reg.test(value)
              if (!testReg) {
                listError.push(`Format du champ ${key} incorrecte`)
              }
            } else if (typeVal === 'string') {
              let reg = new RegExp(
                '[^a-z0-9-àáâãäåòóôõöøèéêëçìíîïùúûüÿñ_s@., ]+',
                'gmi'
              )
              let testReg = reg.test(value)
              if (testReg) {
                listError.push(`Format du champ ${key} incorrecte`)
              }
            } else if (typeVal === 'objectid') {
              let reg = /^[a-z0-9]{24}$/
              let testReg = reg.test(value)
              if (!testReg) {
                listError.push(`Format du champ ${key} incorrecte`)
              }
            } else if (typeVal === 'langage') {
              if (value !== 'FR' && value !== 'EN' && value !== 'ES') {
                listError.push(`Format du champ ${key} incorrecte`)
              }
            }
          } else {
            listError.push(`Format du champ ${key} incorrecte`)
          }
        }
      }
    })

    return listError
  }

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
        listOption.push(val)
      }
    })

    if (listOption.length > 0)
      result = this.verifSecure(listOption, dataToVerif)
    else if (listOption.length === 0 && OneAtLeast) {
      let response = 'Au moins 1 des champs suivant est requis : '
      result.push(response.concat(keyData.join(', ')))
    }
    return result
  }
}
