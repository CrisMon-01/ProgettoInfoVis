# Progetto Individuale 
![Logo Roma Tre](figure/Logo_Roma_Tre.jpg)
<br/>
Progetto per il corso di InfoVis basato su tecnologia d3.js

# Traccia<br/>
Crea un file json con dei dati multivariati :<br/> 
Ci sono 10 data-point e ogni data-point ha quattro variabili quantitative i cui valori sono tutti positivi.<br/>
In base a questi dati disegna 10 automobili da formula uno viste dall'alto (è sufficiente la silhouette) allineate sul lato sinistro dell'area di disegno e con diverse caratteristiche (lunghezza, dimensione delle ruote, distanza delle ruote, ecc) associando ogni caratteristica ad una variabile. <br/>
Facendo click con il pulsante sinistro su una caratteristica di una automobile, tutte le automobili si muovono verso destra di una distanza proporzionale alla loro posizione nell'ordinamento dei data-point in base alla variabile associata a quella caratteristica. Fai in modo che le transizioni siano fluide e continue (non a salti). <br/>
Le macchine sono state

DATI :
* numero
* lunghezza
* dimensione ruote
* distanza delle ruote
* peso

I dati sono codificati nella  silhouette della macchina come segue:
* Lunghezza: dimensione dell'ala anteriore e posteriore (e quindi della vettura in se)
* dimensione delle ruote: nella dimensione delle ruote
* distanza delle ruote: nella distanza tra l'asse anteriore e posteriore della monoposto
* peso: nella lunghezza del blocco centrale della macchina e nella stroke-width, maggiore è il peso, più lungo sarà il body e la stroke-width di questo

CLICK: <br/>
* body: ordina per peso <br/>
* ala anteriore: ordina per lunghezza  <br/>
* ruote anteriori : ordina per distanza tra le ruote  <br/>
* ruote posteriori : ordina per dimensione ruote  <br/>

Run with Docker: <br/>
 `````
  docker build -t demoinfovisimg .
  docker run -dit --name demoinfoviscontainer -p 8080:80 demoinfovisimg
 `````
or pull it from Docker Hub:
 `````
  docker pull crismon01/infovisprog1
 `````
Utilizzo del logo da parte della comunità universitaria.
Il logo dell’Università degli Studi Roma Tre è un marchio registrato di proprietà esclusiva dell’Università e può essere utilizzato dalla comunità universitaria nell’ambito delle attività scientifiche, didattiche e comunicative.