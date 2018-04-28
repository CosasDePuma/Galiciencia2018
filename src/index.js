const { remote } = require('electron')

const API = '6vFmPWoWi4kcWL9CEQujs5dzEbxs9O8M'
const URL = 'https://api.mlab.com/api/1/databases/galiciencia/collections/_2018/5ac3b673f36d287dbca62290?apiKey='
.concat(API)

document.getElementById('close').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.close()
}, false)

getProjects = () => {
  return fetch(URL).then(res => res.json())
}

getClasificacion = (projects) => {
  let clasificacion = []

  projects.forEach(project => {
    let media = 0
    if(project.votes !== undefined) {
      project.votes.forEach(vote => {
        if(vote !== undefined)
          media = media + vote
      })
      if(project.votes.length !== 0)
        media = media / project.votes.length
      clasificacion.push([media, project])
    }
  })
  clasificacion.sort(
    function(projectA, projectB) { return projectB[0] - projectA[0] })

  return clasificacion
}

updatePodio = (clasificacion) => {
  clasificacion = clasificacion.slice(0,3)

  for(let i = 1; i <= 3; i++) {
    let points = clasificacion[i-1][0]
    let project = clasificacion[i-1][1].title
    document.getElementById(`name-${i}premio`).innerHTML = project
    document.getElementById(`points-${i}premio`).innerHTML = 'Puntuación: ' + points
  }
}

getProjects().then(db => {
  const proyectos = db.proyectos
  const clasificacion = getClasificacion(proyectos)
  updatePodio(clasificacion)
})
