const { remote, shell } = require('electron')

const API = '6vFmPWoWi4kcWL9CEQujs5dzEbxs9O8M'
const _URL = 'https://api.mlab.com/api/1/databases/galiciencia/collections/_2018/5ac3b673f36d287dbca62290?apiKey='
  .concat(API)

let proyectos = []

document.getElementById('csv').addEventListener('click', () => {
  downloadCSV(ordenar(proyectos, 'general'))
}, false)

document.getElementById('close').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.close()
}, false)


getProjects = () => {
  return fetch(_URL).then(res => res.json())
}

unificar = (proyectos) => {
  let unificados = []
  proyectos.forEach(proyecto => {
    if(proyecto.title !== undefined) {
      let unificado = []
      let media = [ 0, 0, 0, 0, 0, 0 ]

      unificado.push(proyecto.id)
      unificado.push(proyecto.title)

      if(proyecto.votes !== undefined) {
        proyecto.votes.forEach(vote => {
          if(vote !== undefined) {
            media[0] += vote[0]
            for(let i = 0; i < vote[1].length; i++)
              media[i+1] += vote[1][i]
          }
        })
        if(proyecto.votes.length !== 0) {
          media[0] /= proyecto.votes.length
          for(let i = 1; i < media.length; i++)
            media[i] /= proyecto.votes.length
        }
      }
      for(let i in media) unificado.push(media[i])
      unificados.push(unificado)
    }
  })
  return unificados
}

ordenar = (projects, categoria) => {
  let index = 0

  switch(categoria) {
    case 'todas':
    case 'general': index = 2; break;
    case 'creatividad': index = 3; break;
    case 'metodologia': index = 4; break;
    default:
        index = 0
  }
  return projects.sort(
    function(projectA, projectB) { return projectB[index] - projectA[index] }
  )
}

updatePodio = (clasificacion) => {
  clasificacion = clasificacion.slice(0,3)
  for(let i = 1; i <= 3; i++) {
    let points = clasificacion[i-1][2]
    let project = clasificacion[i-1][1]
    document.getElementById(`name-${i}premio`).innerHTML = project
    document.getElementById(`points-${i}premio`).innerHTML = 'Puntuación: ' + points
  }
}

updateCategoria = (projects, categoria) => {
  let index = undefined
  switch(categoria) {
    case 'creatividad':
        index = 0
        break;
    default:
        index = -1
  }
  let winner = ordenar(ordenar(projects,'general').slice(3,projects.length), categoria)[0]
  document.getElementById(`name-${categoria}`).innerHTML = winner[1]
  document.getElementById(`points-${categoria}`).innerHTML = 'Puntuación: ' + winner[index+3]
}



function downloadCSV(projects)
{
  let content = 'ID, Título, Media, Creatividade, Metodoloxía, Autoría, Defensa Oral, Decoración\r\n\r\n'
  const data = typeof projects != 'object' ? JSON.parse(projects) : projects

  for (let i = 0; i < data.length; i++) {
      var line = ''
      for (let index in data[i]) {
          line += String(data[i][index]).replace(',','') + ','
      }
      line.slice(0,line.Length-1);
      content += line + '\r\n'
  }

  let blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  let url = URL.createObjectURL(blob);
  let link = document.createElement("a")
  link.setAttribute("href", url);
  link.setAttribute("download", 'Galiciencia2018.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

getProjects().then(db => {
  proyectos = db.proyectos
  proyectos = unificar(proyectos)
  updatePodio(ordenar(proyectos, 'general'))
  updateCategoria(proyectos, 'creatividad')
})
