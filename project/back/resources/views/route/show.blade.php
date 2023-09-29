@extends('layouts.app')

@section('template_title')
    {{ $route->name ?? "{{ __('Show') Route" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Route</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('routes.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Sede Id:</strong>
                            {{ $route->sede_id }}
                        </div>
                        <div class="form-group">
                            <strong>Number:</strong>
                            {{ $route->number }}
                        </div>
                        <div class="form-group">
                            <strong>Created By:</strong>
                            {{ $route->created_by }}
                        </div>
                        <div class="form-group">
                            <strong>Modified By:</strong>
                            {{ $route->modified_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
