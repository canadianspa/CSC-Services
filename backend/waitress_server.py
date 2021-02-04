from waitress import serve
import app
from paste.translogger import TransLogger

serve(TransLogger(app.app), host='0.0.0.0', port=5000)
