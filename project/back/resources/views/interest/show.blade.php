@extends('layouts.app')

@section('template_title')
    {{ $interest->name ?? "{{ __('Show') Interest" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Interest</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('interests.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Interest:</strong>
                            {{ $interest->interest }}
                        </div>
                        <div class="form-group">
                            <strong>State:</strong>
                            {{ $interest->state }}
                        </div>
                        <div class="form-group">
                            <strong>Created By:</strong>
                            {{ $interest->created_by }}
                        </div>
                        <div class="form-group">
                            <strong>Modified By:</strong>
                            {{ $interest->modified_by }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
