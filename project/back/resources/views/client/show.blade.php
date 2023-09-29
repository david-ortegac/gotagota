@extends('layouts.app')

@section('template_title')
    {{ $client->name ?? "{{ __('Show') Client" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Client</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('clients.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Route Id:</strong>
                            {{ $client->route_id }}
                        </div>
                        <div class="form-group">
                            <strong>Name:</strong>
                            {{ $client->name }}
                        </div>
                        <div class="form-group">
                            <strong>Last Name:</strong>
                            {{ $client->last_name }}
                        </div>
                        <div class="form-group">
                            <strong>Email:</strong>
                            {{ $client->email }}
                        </div>
                        <div class="form-group">
                            <strong>Phone:</strong>
                            {{ $client->phone }}
                        </div>
                        <div class="form-group">
                            <strong>Address:</strong>
                            {{ $client->address }}
                        </div>
                        <div class="form-group">
                            <strong>City:</strong>
                            {{ $client->city }}
                        </div>
                        <div class="form-group">
                            <strong>Profession:</strong>
                            {{ $client->profession }}
                        </div>
                        <div class="form-group">
                            <strong>Notes:</strong>
                            {{ $client->notes }}
                        </div>
                        <div class="form-group">
                            <strong>Type:</strong>
                            {{ $client->type }}
                        </div>
                        <div class="form-group">
                            <strong>Created By:</strong>
                            {{ $client->created_by }}
                        </div>
                        <div class="form-group">
                            <strong>Modified By:</strong>
                            {{ $client->modified_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
