import CainiaoTracker from './trackers/cainiao';
import CorreosChileTracker from './trackers/correosChile';

export default class TrackerApi {
  static queryCorreosChile(req, res) {
    let code = req.params.code;

    CorreosChileTracker.getPackage(code, (err, track) => {
      if (err) {
        console.error('CorreosChile Error!', err);
        res.sendStatus(500);
      }
      else {
        res.json(track);
      }
    });
  }

  static queryCainiao(req, res) {
    let code = req.params.code;

    CainiaoTracker.getPackage(code, (err, track) => {
      if (err) {
        console.error('Cainiao Error!', err);
        res.sendStatus(500);
      }
      else {
        res.json(track);
      }
    });
  }

  static ping(req, res) {
    let response = { status: 'OK!', currentTimestamp: Date.now() };
    res.json(response);
  }
}

/*
  Export formats:

    CorreosChile:
      {
        'id': 'RB351146770SG',
        'data': {
          'destinyId': 'RB351146770SG',
          'deliveryDate': '09/11/2017 18:26:00',
          'receiver': 'Juan Pérez',
          'receiverId': '123456789'
        },
        'states': [
          {
            'state': 'ENVIO ENTREGADO',
            'date': '09/11/2017 18:26:00',
            'location': 'UNIDAD DE AVISOS EXPOSICIÓN'
          },
          {
            'state': 'ENVIO DISPONIBLE PARA RETIRO',
            'date': '09/11/2017 14:41:00',
            'location': 'UNIDAD DE AVISOS EXPOSICIÓN'
          }
        ]
      }
    
    Cainiao:
      {
        'id': 'RB351146770SG',
        'data': {
          'destinyId': null,
          'retries': 1,
          'trackerWebsite': 'https://global.cainiao.com/detail.htm?mailNoList=RB351146770SG'
        },
        'states': [
          {
            'state': 'Arrival at Processing Center (Country code: CL)',
            'date': '26/10/2017 16:49:00',
            'location': null
          },
          {
            'state': 'Arrive at destination country',
            'date': '18/10/2017 23:11:00',
            'location': null
          }
        ]
      }
*/