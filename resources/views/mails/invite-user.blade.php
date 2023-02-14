<div>
  <p>Hei, {{ $user['name'] }}!</p>

  <p>Du er blitt opprettet som bruker i Hammerfest kommunes <a href="{{ config('app.url') }}">{{ config('app.name') }}</a>.</p>

  <div style="margin: 2rem 0;">
    <p style="margin-bottom: 1rem;"><strong>Påloggingsdetaljer</strong></p>
    <p style="margin-bottom: .5rem;">Brukernavn: {{ $user->email }}</p>
    <p style="margin-bottom: .5rem;">Passord: {{ $password }}</p>
  </div>

  <p>Du kan nå logge inn ved å gå til <a href="{{ config('app.url') }}/login">{{ config('app.url') }}/login</a></p>

  
  
</div>